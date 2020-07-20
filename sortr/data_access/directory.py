import boto3
from boto3.dynamodb.conditions import Attr
import sortr


def get_directory_items(item_type, parent_directory):
    dynamodb = boto3.resource('dynamodb')
    dir = dynamodb.Table('directory')

    res = dir.scan(
        IndexName='parentDirectory-directoryItemType-index',
        FilterExpression=(
            Attr('parentDirectory').eq(parent_directory) &
            Attr('directoryItemType').eq(item_type)
        ),
    )

    if item_type == 'file':
        print(res)

    if res['Count'] > 0:
        return res['Items']

    return None
