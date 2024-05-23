import { gql, request } from 'graphql-request'

export const getRoutes = async () => {
    const document = gql`
    query MyQuery {
        area(uuid: "ee1d37e7-dc41-5c26-a358-5d51af01f499") {
          areaName
          children {
            id
            areaName
            children {
              id
              areaName
              climbs {
                name
                id
                grades {
                  french
                  yds
                }
                boltsCount
                content {
                  description
                  location
                }
              }
            }
          }
        }
      }
    `
   const routes =  await request('https://api.openbeta.io/', document)
   return routes
}

