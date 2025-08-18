#!/usr/bin/env node
import { program } from "commander";
import  init  from "../src/cli/init.js";
import dotenv from "dotenv";

dotenv.config()

program 
 .command("init").description("Connect to momgoDB and create Indexes")
 .action(init)




program.parse(process.argv)
