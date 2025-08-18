#!/usr/bin/env node
import { program } from "commander";
import  init  from "../src/cli/init.js";
import dotenv from "dotenv";
import fetchRepos from "../src/cli/fetchRepos.js";
import connectDB from "../src/db/connectDb.js";

dotenv.config()

await connectDB()

program 
 .command("init").description("Connect to momgoDB and create Indexes")
 .action(init)


program
 .command("fetch <org>").option('--since <data>').description("Fetch Repos from Org ")
 .action(async (org,options)=>{
    await fetchRepos(org,options);
 })



program.parse(process.argv)
