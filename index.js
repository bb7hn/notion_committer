import { Client } from "@notionhq/client"
import { core } from "@@actions/core"

const SECRET_GITHUB = core.getInput('SECRET_GITHUB');
const NOTIONAPIKEY = core.getInput('NOTION_API_KEY');
const NOTION_DATABASE = core.getInput('NOTION_DATABASE');
const OWNER = core.getInput('OWNER');
const REPO = core.getInput('REPO');


const notion = new Client({ auth: NOTIONAPIKEY })

const databaseId = NOTION_DATABASE

async function addItem(title,message,time,committedBy) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            "properties": {
                "Title": {
                    "title": [
                        {
                            "text": {
                                "content": title
                            }
                        }
                    ]
                },
                "Description": {
                    "rich_text": [
                        {
                            "text": {
                                "content": message
                            }
                        }
                    ]
                },
                "Date": {
                    "date": {
                        "start": time
                    }
                },
                "committedBy": {
                    "rich_text": [
                        {
                            "text": {
                                "content": committedBy
                            }
                        }
                    ]
                }
            },
        })
        console.log("Success! Commit pushed to notion.")
    } 
    catch (error) {
        console.error(error.body)
    }
}
import { Octokit } from "@octokit/core";
const octokit = new Octokit({
    auth: SECRET_GITHUB
})

const filter = (val)=>{
    return (val!=''&&val&&val.length>0)
}

let response = await octokit.request('GET /repos/{owner}/{repo}/commits/main', {
    owner: OWNER,
    repo: REPO
})

const commit = response.data.commit;

let time = new Date(commit.committer.date);
//time = time.getFullYear()+'/'+("0"+(time.getMonth()+1)).slice(-2)+'/'+("0" + time.getDay()).slice(-2)+' '+time.getHours()+':'+time.getMinutes();

let messages = commit.message.split('\n');
messages = messages.filter(filter);

let title = messages[0];
let committedBy = (commit.committer.name);
messages.splice(0,1);
let message = messages.join('\n');
addItem(title,message,time,committedBy);