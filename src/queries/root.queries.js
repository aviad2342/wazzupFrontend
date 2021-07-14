import {gql} from '@apollo/client';

export const CHAT =  gql`
query chat($chatId: String!) {
    chat(chatId: $chatId) {
        _id
          id
          messages{
            _id
            from {
              _id
              phone
              name
              avatar
            }
            to {
              _id
              phone
              name
              avatar
            }
            date
            body
          }
    }
}
`;

export const CONTACT = gql`
query user($userPhone: String!) {
    user(userPhone: $userPhone) {
        _id
          phone
          name
          avatar
    }
 }
`;