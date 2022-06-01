import { gql } from '@apollo/client';
//QUERY GETING USER/BOOK DATA AND EXECUTION
export const GET_ME = gql`
{
    me{
        username
        email
       readingList{
            authors
            description
            bookId
            image
            link
            title
        }
    }
}
`;