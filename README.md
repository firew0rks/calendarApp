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

## Icon Library

Uses React-native-vector-icon library with native-base icon component to load.

[ref](https://oblador.github.io/react-native-vector-icons/)

## Bugs

- App crashes when there are no dates left on the calendar

## Troubleshooting

```txt
line 2: node: command not found
Command /bin/sh failed with exit code 127
```

When building on device, RealmJS requires a node to be set on PATH. If node is installed via nvm with no native node installation then the error shown above will be thown when trying to build to a device. To fix this issue, symlink your nvm node path with the path RealmJS is trying to look for.

To find current node path:

`which node`

To link nvm version of node to local node

`sudo link $(which node) /usr/local/bin/node`

## TODO:

- Calendar performance issues
- Calendar Activity card movement
- Activity list activity edit
- Load activties on main view
- Switch between main and admin view
- BUG: Images not loading
