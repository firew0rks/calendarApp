# Running Instructions

## Prerequisites

For Macs:

- XCode with iPad emulator
- Android Studio with Android Tablet Emulator

For Windows:

- Android Studio with Android Tablet Emulator

## Local Development

Depending on whether you want to use iOS or Android simulator, the steps will be slightly different.

1. Clone the repository
1. `npm install`
1. `npm run ipad`

## iOS

1. `cd ios`
1. `pod install`

## Data Structure for Calendar

The CSV formatted data will be converted to the following array for a particular day.

```json
[
    {
        "activity1": "Sleeping",
        "activity2": "",
        "endTime": "0730",
        "startTime": "0000"
    },
    {
        "activity1": "Wake up and do morning routine",
        "activity2": "",
        "endTime": "0820",
        "startTime": "0730"
    },
        {
        "activity1": "Go to Scope on the bus with my friends",
        "activity2": "Go to Scope in the taxi with my friends",
        "endTime": "0900",
        "startTime": "0820"
    },
    {
        "activity1": "Shopping",
        "activity2": "",
        "endTime": "1200",
        "startTime": "0900"
    },
    ...
]
```

## Photo Library

The photos are loaded in by name, matching the activity description (including spaces, all lower case). For example, an activity could be `Go to Scope on the bus with my friends`, so the image name needs to be `go to Scope on the bus with my friends.jpg`.
