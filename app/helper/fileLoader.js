import * as RNFS from 'react-native-fs';
import Papa from 'papaparse';

const SCHEDULE_PATH = RNFS.DocumentDirectoryPath;
const SCHEDULE_FILE = 'schedule.csv';

export function loadScheduleData() {
  return new Promise((resolve, reject) => {
    RNFS.readDir(SCHEDULE_PATH)
      .then(result => {
        // Find index of test.txt
        const fileIdx = result.findIndex(x => x.name === SCHEDULE_FILE);

        if (fileIdx !== -1) {
          return Promise.all([
            RNFS.stat(result[fileIdx].path),
            result[fileIdx].path,
          ]);
        }

        return reject(new Error('No file'));
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return reject(new Error('No file'));
      })
      .then(contents => {
        // log the file content
        resolve(contents);
      })
      .catch(err => {
        reject(new Error(err.message));
      });
  });
}

/**
 * Data Structure:
 * {
 *  "date": [
 *    {
 *      "startDateTime": "string",
 *      "endDateTime": "string",
 *      "activity1": "string",
 *      "activity2": "string"
 *    }
 *  ]
 *  "date": ...
 * }
 *
 *
 * @param {*} data
 * @returns {*} transformedData
 */
export async function transformScheduleData(data) {
  // TODO: Remove all the blank lines
  const readData = await Papa.parse(data);

  if (readData.data.length === 0) {
    return {};
  }

  const formattedData = {};
  readData.data.forEach(e => {
    const date = e[0];
    const time = e[1];
    const activity1 = e[2];
    const activity2 = e[3];

    if (!Object.keys(formattedData).includes(date)) {
      formattedData[date] = [
        {
          startTime: time,
          activity1,
          activity2,
        },
      ];
    } else {
      formattedData[date].push({
        startTime: time,
        activity1,
        activity2,
      });
    }
  });

  // Adding endtimes.
  const k = Object.keys(formattedData);
  for (let i = 0; i < k.length - 1; i++) {
    for (let j = 0; j < formattedData[k[i]].length - 1; j++) {
      formattedData[k[i]][j].endTime = formattedData[k[i]][j + 1].startTime;
    }
    formattedData[k[i]][formattedData[k[i]].length - 1].endTime = null;
  }

  return formattedData;
}

export function getImage(photoName) {
  try {
    return RNFS.readFile(
      SCHEDULE_PATH + '/photos/' + photoName + '.jpg',
      'base64',
    );
  } catch (error) {
    console.log(error);
  }
}

export function getPath() {
  console.log('path', `${SCHEDULE_PATH}/${SCHEDULE_FILE}`);
}

export function writeFile() {
  // write the file
  RNFS.writeFile(
    `${SCHEDULE_PATH}/${SCHEDULE_FILE}`,
    'Lorem ipsum dolor sit amet',
    'utf8',
  )
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
}
