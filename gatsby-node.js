var pluscodes = require("open-location-code-typescript");

const gMapsURI = (lat, lon) => {
  const plusCode = encodeURIComponent(pluscodes.default.encode(lat, lon));
  return `https://www.google.com/maps/embed/v1/place?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&q=${plusCode}`;
};


exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allDatoCmsEventEnriched: {
        type: [`DatoCmsEvent`],
        resolve: (source, args, context, info) => {
          const events = context.nodeModel.getAllNodes({ type: `DatoCmsEvent` })
          return events.map(e => Object.assign(e, {gMapsURI: gMapsURI(e.latitude, e.longitude)}))
        }
      }
    }
  }
  createResolvers(resolvers)
}



exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  console.log(node.internal.type)
  if (node.internal.type == "DatoCmsEvent") {
    createNodeField({
      node: node,
      name: "gMapsURI",
      value: gMapsURI(
        node.entityPayload.attributes.location.latitude,
        node.entityPayload.attributes.location.longitude
      ),
    });
  }
};
