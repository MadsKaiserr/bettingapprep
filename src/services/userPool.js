import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_59hfetBJz",
    ClientId: "1p3o9estagmcjgdnokc0uevj12"
}

export default new CognitoUserPool(poolData);