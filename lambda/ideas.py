import boto3
import time
import json
import random
import string
import decimal

print('Loading function')
dynamo = boto3.resource('dynamodb').Table('Ideas')


def handler(event, context):

    operation = event['httpMethod']

    operations = {
        'POST': lambda x: create(x),
        'GET': lambda x: get(x),
        'PATCH': lambda x: update(x),
        'DELETE': lambda x: delete(x)
    }

    if operation in operations:
        return operations[operation](event)
    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))


def create(event):
    data = json.loads(event['body'])

    print('Executing create event' + json.dumps(data))

    if 'title' not in data:
        raise Exception("Couldn't create  item.")

    timestamp = int(time.time() * 1000)

    item = {
        'id': ''.join([random.choice(string.ascii_letters + string.digits) for n in range(6)]),
        'title': data['title'],
        'body': data['body'],
        'upvotes': data['upvotes'],
        'comments': data['comments'],
        'createdAt': timestamp,
        'updatedAt': timestamp,
    }

    # write the todo to the database
    dynamo.put_item(Item=item)

    return send_200_response(item)


def delete(event):
    print('Executing delete event' + event['pathParameters']['id'])
    dynamo.delete_item(
        Key={
            'id': event['pathParameters']['id']
        }
    )

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        }
    }

    return response


def get_one(idea_id):
    print('Executing Get event: ' + idea_id)
    result = dynamo.get_item(
        Key={
            'id': idea_id
        }
    )

    return send_200_response(result['Item'])


def get(event):
    if event['pathParameters'] and 'id' in event['pathParameters']:
        return get_one(event['pathParameters']['id'])

    print('Executing Scan event')
    result = dynamo.scan()

    return send_200_response(result['Items'])


def update(event):
    data = json.loads(event['body'])
    print('Executing update event' + json.dumps(data))

    timestamp = int(time.time() * 1000)

    result = dynamo.update_item(
        Key={
            'id': event['pathParameters']['id']
        },
        ExpressionAttributeValues={
            ':title': data['title'],
            ':body': data['body'],
            ':upvotes': data['upvotes'],
            ':comments': data['comments'],
            ':updatedAt': timestamp,
        },
        UpdateExpression='SET title = :title, '
                         'body = :body, '
                         'upvotes = :upvotes,'
                         'comments = :comments,'
                         'updatedAt = :updatedAt',
        ReturnValues='ALL_NEW'
    )

    return send_200_response(result['Attributes'])


def send_200_response(data):
    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "body": json.dumps(data, cls=DecimalEncoder)
    }

    return response


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)
