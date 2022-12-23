import { gql } from '@apollo/client';

const GET_AUTHENTICATED = gql`
  query getAuthenticated($email: String!, $password: String!) {
    userAuthenticated(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      isAuthenticated
    }
  }
`;

export { GET_AUTHENTICATED };
