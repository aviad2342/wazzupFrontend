import {gql} from '@apollo/client';
import { useSubscription } from "@apollo/client";

// export const MESSAGE_SUBSCRIPTION = gql`
//   subscription messageAdded($messageId: ID!) {
//     messageAdded(messageId: $messageId) {
//       id
//       body
//     }
//   }
// `;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      author
      comment
    }
  }
`;

// const messagePush = () => {
//   const {data, error, loading} = useSubscription(MESSAGE_SUBSCRIPTION, {
//     variables: {
//     id: "my id"
//   }});
//   if(loading) {
//     console.log('bla');
//   }
//   if(error) {
//     console.log('bla');
//   }
//   console.log(data);
//   return data;
// };