import { getAllIngressesHandler } from '../../../src/handlers/get-all-ingresses.mjs';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";

describe('Test getAllIngressesHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
      });

    it('should return ids', async () => {
        const ingresses = [{ id: 'id1' }, { id: 'id2' }];

        // Return the specified value whenever the spied scan function is called
        ddbMock.on(ScanCommand).resolves({
            Items: ingresses,
        });

        const event = {
            httpMethod: 'GET'
        };

        // Invoke helloFromLambdaHandler()
        const result = await getAllIngressesHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(ingresses)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
