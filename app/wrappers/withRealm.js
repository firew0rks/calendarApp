// import React, {useState, useEffect} from 'react';
// import Realm from 'realm';

// export default function withRealm(WrappedComponent) {
//   return props => {
//     const [realm, setRealm] = useState(null);

//     useEffect(() => {
//       Realm.open({schema: [Car, Person]})
//         .then(realm => {
//           // ...use the realm instance here
//         })
//         .catch(error => {
//           // Handle the error here if something went wrong
//         });
//     });

//     return <WrappedComponent {...props} />;
//   };
// }
