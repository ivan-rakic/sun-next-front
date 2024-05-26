import { gql } from "@apollo/client";

export const GET_HEADER = gql`
  query GetHeader {
    header {
      data {
        attributes {
          menu_links {
            data {
              attributes {
                slug
                label
              }
            }
          }
          social_menus{
            data{
              attributes{
                slug
                link
                label
              }
            }
          }
        }
      }
    }
  }
`;