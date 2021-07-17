import {gql} from '@apollo/client';

export const NEW_MESSAGE = gql`
mutation newMessage($chatId: ID!, $from: String!, $to: String!, $date: String!, $body: String!) {
    newMessage(newMessageInput:{chatId: $chatId, from: $from, to: $to, date: $date, body: $body}) {
        date
        body
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
        _id
    }
}
`;

export const NEW_USER = gql`
mutation createUser($phone: String!, $name: String!, $avatar: String!) {
  createUser(userInput:{phone: $phone, name: $name, avatar: $avatar}) {
    _id
  phone
  name
  avatar
    }
}
`;