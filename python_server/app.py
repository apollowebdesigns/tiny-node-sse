#!/usr/bin/env python

# WS server that sends messages at random intervals
import math
import asyncio
import datetime
import random
import websockets
import json


async def time(websocket, path):
    while True:
        satArray = [
            [{'id': 1, 'state': 'OK'}, {'id': 2, 'state': 'OK'}, {'id': 3, 'state': 'OK'}, {'id': 4, 'state': 'OK'}],
            [{'id': 1, 'state': 'OK'}, {'id': 2, 'state': 'OK'}, {'id': 3, 'state': 'OK'}, {'id': 4, 'state': 'ERROR'}],
            [{'id': 1, 'state': 'OK'}, {'id': 2, 'state': 'OK'}, {'id': 3, 'state': 'ERROR'}, {'id': 4, 'state': 'OK'}],
            [{'id': 1, 'state': 'OK'}, {'id': 2, 'state': 'ERROR'}, {'id': 3, 'state': 'OK'}, {'id': 4, 'state': 'OK'}],
            [{'id': 1, 'state': 'ERROR'}, {'id': 2, 'state': 'OK'}, {'id': 3, 'state': 'OK'}, {'id': 4, 'state': 'OK'}],
        ]
        roughIndex = random.random() * (len(satArray) - 1)
        randomIndex = int(roughIndex)
        now = json.dumps(satArray[randomIndex])
        # now = datetime.datetime.utcnow().isoformat() + 'Z'
        await websocket.send(now)
        await asyncio.sleep(random.random() * 3)


start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
