'use strict';

let currentUserId = 'aoA2AfS5key5e4skHS9Z';

function createProject(project_name, description, emoji_name, user_ids, vault_url){
    var projectData = {
        current: false,
        project_name: project_name,
        description: description,
        emoji_name: emoji_name,
        group_ids: [],
        user_ids: user_ids,
        vault_url: vault_url
    }
    chrome.runtime.sendMessage({type: 'addWithRandomID', opts: {collection: 'project', data: projectData}}, function(response) {
        if (response.status == 'success'){
            console.log('project added: ', response.docRefId)
            alert('project added successfully');
        }
    });
}

function updateProject(project_id, project_name, description, emoji_name, vault_url){
    var updateProjectData = {}
    if (project_name != null){
        updateProjectData.project_name = project_name
    } 
    if (description != null){
        updateProjectData.description = description
    } 
    if (emoji_name != null){
        updateProjectData.emoji_name = emoji_name
    } 
    if (vault_url != null){
        updateProjectData.vault_url = vault_url
    } 

    chrome.runtime.sendMessage({type: 'editWithID', opts: {collection: 'project', id: project_id, data: updateProjectData}}, function(response){
        if (response == 'success'){
            console.log('projected edited')
            alert('project edited successfully');
        }
    });
}

function createGroupInProject(project_id, emoji_name, group_name){
    var groupData = {
        project_id: project_id,
        emoji_name: emoji_name,
        group_name: group_name,
        group_ids: [],
        file_ids: []
    }
    chrome.runtime.sendMessage({type: 'addWithRandomID', opts: {collection: 'group', data: groupData}}, function(response) {
        if (response.status == 'success') {
            console.log('group added: ', response.docRefId)
            alert('group added successfully');

            // adds generated group_id to project group_ids list
            chrome.runtime.sendMessage({type: 'updateDocumentListField', opts: {collection: 'project', id: project_id, field: 'group_ids', data: response.docRefId}})
        } 
    });
}

// same as function as above, but for groups 
function createGroupInGroup(project_id, group_id, emoji_name, group_name){
    var groupData = {
        project_id: project_id,
        emoji_name: emoji_name,
        group_name: group_name,
        group_ids: [],
        file_ids: []
    }
    chrome.runtime.sendMessage({type: 'addWithRandomID', opts: {collection: 'group', data: groupData}}, function(response) {
        if (response.status == 'success') {
            console.log('group added: ', response.docRefId)
            alert('group added successfully');

            // adds generated group_id to group group_ids list
            chrome.runtime.sendMessage({type: 'updateDocumentListField', opts: {collection: 'group', id: group_id, field: 'group_ids', data: response.docRefId}})
        } 
    });
}

function createFileInGroup(group_id, emoji_name, file_name, url){
    var fileData = {
        emoji_name: emoji_name,
        file_name: file_name,
        group_id: group_id,
        url: url,
    }
    chrome.runtime.sendMessage({type: 'addWithRandomID', opts: {collection: 'file', data: fileData}}, function(response) {
        if (response.status == 'success'){
            console.log('file added: ', response.docRefId)
            alert('file added successfully');

            // adds generated file_id to group file_ids list
            chrome.runtime.sendMessage({type: 'updateDocumentListField', opts: {collection: 'group', id: group_id, field: 'file_ids', data: response.docRefId}})
        }
    });
}

function removeUserFromProject(userId, projectId){
    // remove user_id from project
    chrome.runtime.sendMessage({type: 'removeDocumentListField', opts: {collection: 'project', id: projectId, field: 'user_ids', data: userId}})

    // remove project_id from user
    chrome.runtime.sendMessage({type: 'removeDocumentListField', opts: {collection: 'users', id: userId, field: 'project_ids', data: projectId}})
}

function addUserToProject(userId, projectId){
  // add user_id to project
  chrome.runtime.sendMessage({type: 'updateDocumentListField', opts: {collection: 'project', id: projectId, field: 'user_ids', data: userId}})

  // add project_id to user
  chrome.runtime.sendMessage({type: 'updateDocumentListField', opts: {collection: 'users', id: userId, field: 'project_ids', data: projectId}})
}

function removeGroup(){

}

function updateGroup(){
    
}