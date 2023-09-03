const  { defaultFieldResolver, GraphQLSchema } = require('graphql');
const { getDirective, MapperKind, mapSchema } = require ('@graphql-tools/utils');
const { auth, hasPermission, hasRole } = require ('keycloak-connect-graphql');

function authDirectiveTransformer(schema = new GraphQLSchema, directiveName = 'auth')   {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = auth(resolve);
      }
      console.log(fieldConfig)
      return fieldConfig;
    }
  });
};

const permissionDirectiveTransformer = (schema = GraphQLSchema, directiveName = 'hasPermission') => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const permissionDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (permissionDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const keys = Object.keys(permissionDirective);
        let resources;
        if (keys.length === 1 && keys[0] === 'resources') {
          resources = permissionDirective[keys[0]];
          if (typeof resources === 'string') resources = [resources];
          if (Array.isArray(resources)) {
            resources = resources.map((val) => String(val));
          } else {
            throw new Error('invalid hasRole args. role must be a String or an Array of Strings');
          }
        } else {
          throw Error("invalid hasRole args. must contain only a 'role argument");
        }
        fieldConfig.resolve = hasPermission(resources)(resolve);
      }
      return fieldConfig;
    }
  });
};

const roleDirectiveTransformer = (schema = GraphQLSchema, directiveName = 'hasRole') => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const roleDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (roleDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const keys = Object.keys(roleDirective);
        let role;
        if (keys.length === 1 && keys[0] === 'role') {
          role = roleDirective[keys[0]];
          if (typeof role === 'string') role = [role];
          if (Array.isArray(role)) {
            role = role.map((val) => String(val));
          } else {
            throw new Error('invalid hasRole args. role must be a String or an Array of Strings');
          }
        } else {
          throw Error("invalid hasRole args. must contain only a 'role argument");
        }
        fieldConfig.resolve = hasRole(role)(resolve);
      }
      return fieldConfig;
    }
  });
};

const applyDirectiveTransformers = (schema = GraphQLSchema) => {
  return authDirectiveTransformer(roleDirectiveTransformer(permissionDirectiveTransformer(schema)));
};

module.exports = applyDirectiveTransformers;