// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
});

// this file will run once on extension load
var config = {
    apiKey: "AIzaSyCRZx1qt5IrkowmXhV1xlqDyFBEjbZKclY",
    authDomain: "probable-signal-282616.firebaseapp.com",
    databaseURL: "https://probable-signal-282616.firebaseio.com",
    projectId: "probable-signal-282616",
    storageBucket: "probable-signal-282616.appspot.com",
    messagingSenderId: "469159805451",
    appId: "1:469159805451:web:48f16ebddafd2076383d0e",
    measurementId: "G-MT23Y3JQ2L"
  };
const app = firebase.initializeApp(config);
const database = app.firestore();

//Firestore documentation: https://firebase.google.com/docs/firestore/manage-data/add-data
// database.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })

database.collection("users").doc("bobby.nguyen@shopify.com").set({
  password: "test"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

database.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
});

//In order to access the Firebase DB through other js files, the following listeners
//are initalized below.

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
    case 'addWithRandomID':
      database.collection(msg.opts.collection).add(msg.opts.data).then(function(docRef) {
        response({status: 'success', docRefId: docRef.id})
      });
      break;
    case 'editWithID':
      database.collection(msg.opts.collection).doc(msg.opts.id).update(msg.opts.data);
      response('success');
      break;
    case 'updateDocumentListField':
      database.collection(msg.opts.collection).doc(msg.opts.id).update({
        [msg.opts.field]: firebase.firestore.FieldValue.arrayUnion(msg.opts.data) 
      });
    case 'queryCollectionWithID':
      var document = database.collection(msg.opts.collection).doc(msg.opts.id);
      document.get().then(function(doc) {
          if (doc.exists) {
            response(JSON.stringify(doc.data()));
          } else {
              response(null);
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      break;
    case 'queryCollectionWithWhere':
      if (msg.opts.where.length == 3) {
        var document = database.collection(msg.opts.collection)
          .where(msg.opts.where[0], msg.opts.where[1], msg.opts.where[2]);
        document.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.exists) {
              response(JSON.stringify(doc.data()));
            } else {
              response(null);
            }
          })
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      } else {
        response('invalid number of where params, expected 3')
      }
    break;
    default:
      response('unknown request');
      break;
  }
  return true;
});
