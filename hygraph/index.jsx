import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://api-us-west-2.hygraph.com/v2/clovwhwrz4eud01uqfl739ivx/master";

export const getQuery = async () => {
  const query = gql`
    query MyQuery {
      vanTypes(where: { id: "clp20wntffhgf0blutxpdtbcd" }) {
        basePrice
        description
        id
        name
        laborHours
        image {
          height
          width
          url
        }
        sku
        stepCategories(orderBy: displayOrder_ASC) {
          description
          id
          name
          optionGroups {
            description
            id
            name
            optionGroup {
              ... on Option {
                id
                name
                defaultItem
                description
                image {
                  height
                  width
                  url
                }
                laborHours
                price
                sku
                toolTip
              }
            }
          }
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
