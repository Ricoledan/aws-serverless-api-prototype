import { getByIdHandler } from '../../../src/handlers/get-by-id.mjs'; 
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
 
describe('Test getByIdHandler', () => { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    // This test invokes getByIdHandler() and compare the result  
    it('should get ingress by id', async () => {
        const ingress = { id: 'id1' };
 
        // Return the specified value whenever the spied get function is called 
        ddbMock.on(GetCommand).resolves({
            Ingress: ingress,
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id1' 
            } 
        };
 
        // Invoke getByIdHandler() 
        const result = await getByIdHandler(event);
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(ingress)
        };
 
        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    }); 
}); 
 