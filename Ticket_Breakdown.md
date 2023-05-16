# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Sub-tasks:
- Create FacilitiesAgents table
  - This will allow Facilities to enter details relating to their business concerns against an Agent, mapping the FacilitiesAgent entry to the Agents table primary key (uuid).
- Add `addAgentToFacility` endpoint
  - This function will allow a Facility user to add an Agent to their list of agents, specific to their Facility
- Extend Shifts table to include 'FacilitiesAgentID'
  - Every work shift created will now include both the internal AgentID and the ID relating to the Agent specific to the Facility which the Shift relates to.
- Update call to `addShift` to include FacilitiesAgentID

### Task Details

#### Create FacilitiesAgents table

Requirements: Create a new table that can be used to map Facilities with Agents, allow the facility to enter extra metadata relating to this agent and their requirements.

AC: Make sure that no duplicate entries can be created based on the internal AgentID key.

Estimate: DB effort, 1 Day.

#### Add `addAgentToFacility` endpoint

Requirements: A new API enpoint needs to be created to allow Facilities to save Agents against their profile.

AC: Validated the Agent to be added and calls the DB to add the entry FacilitiesAgents table if there's no existing entry.

Estimate: 1 Day

#### Add `Add Agent` UI for Facilities

Requirements: A new app view will allow Facilities to link Agents from the list of Agents to their Facility; an existing view might be able to be updated.

AC: Presents the list of Agents relevant to the Facility so that can then submit to add the Agent to their list of Agents

Estimate: 1-2 days

#### Extend Shifts table to include 'FacilitiesAgentID'

Requirements: The Shifts table needs to be updated to include an entry that allows easy mapping to Agents using bother the internal value and the value relating to the Facility.

AC: A new 'FacilitiesAgentID' column is added with a uuid for the Agent specific to the Facility; Handle backwards compatibility or create a script to generate values for historic entries. 

Estimate: 1-3 Days

#### Update 'addShift' endpoint

Requirements: Update endpoint so that it takes the extra 'FacilitiesAgentID' as part of the payload, or does a lookup for this data, depending on which is easier.

AC: When a shift is added, the 'FacilitiesAgentID' is part of the request made to save in DB

Estimate: 1-2 Days

#### Update 'generateReport' to use bew data

Requirements: Generated report can now use 'FacilitiesAgentID' to make the report mor relevant to the Facility generating the report.

AC: Generated report uses 'FacilitiesAgentID' when listing Shifts and Agents.

Estimate: 1 Day
