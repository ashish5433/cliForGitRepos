#!/usr/bin/env node
import { program } from "commander";
import init from "../src/cli/init.js";
import dotenv from "dotenv";
import fetchRepos from "../src/cli/fetchRepos.js";
import fetchTopRepos from "../src/cli/fetchTopRepos.js";
import exportToCSV from "../src/cli/exportToCSV.js";
import connectDB from "../src/db/connectDb.js";
import syncStars from "../src/cli/syncStars.js";
dotenv.config()

await connectDB()

// INIT
program
    .command("init").description("Connect to momgoDB and create Indexes")
    .action(init)


// Fetch
program
    .command("fetch <org>").option('--since <data>').description("Fetch Repos from Org ")
    .action(async (org, options) => {
        await fetchRepos(org, options);
    })


// Top Repos
program
    .command("top").requiredOption("--org <org>").requiredOption("--metric <feild>").requiredOption("--limit <n>")
    .description("Print a console tabel sorted by given Metrics")
    .action(async (option) => {
        await fetchTopRepos(option);
    })


// Export to CSV
program
    .command("export").requiredOption("--org <org>").requiredOption("--out <out>")
    .description("Export Repos to CSV")
    .action(async (option) => {
        await exportToCSV(option);
    })


// Sync Stars and Forks
program
    .command("sync-stars").requiredOption("--org <org>")
    .description("Syncing stars and forks count")
    .action(async(option)=>{
        await syncStars(option)
    })

    
program.parse(process.argv)
