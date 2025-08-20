#!/usr/bin/env node
import { program } from "commander";
import  init  from "../src/cli/init.js";
import dotenv from "dotenv";
import fetchRepos from "../src/cli/fetchRepos.js";
import fetchTopRepos from "../src/cli/fetchTopRepos.js";
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

program
 .command("top").option("--org <org>").option("--metric <feild>").option("--limit <n>")
 .description("Print a console tabel sorted by given Metrics")
 .action(async(option)=>{
    await fetchTopRepos(option);
 })
 

program.parse(process.argv)
