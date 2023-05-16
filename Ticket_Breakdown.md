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
Create FacilitiesAgents table
- This will allow Facilities to enter details relating to their business concerns against an Agent, mapping the FacilitiesAgent entry to the Agents table primary key (uuid).
  Add `addAgentToFacility` endpoint
- This function will allow a Facility user to add an Agent to their list of agents, specific to their Facility
  Extend Shifts table to include 'FacilitiesAgentID'
- Every work shift created will now include both the internal AgentID and the ID relating to the Agent specific to the Facility which the Shift relates to.
- update call to `addShift` to include FacilitiesAgentID

### Task Details

#### Create FacilitiesAgents table

Requirements: Create a new table that can be used to map Facilities with Agents, allow the facility to enter extra metadata relating to this agent and their requirements.

AC: Make sure that no duplicate entries can be created based on the internal AgentID key.

Estimate: DB/Backend effort, 1-2 days; UI effort, assuming a new view, 2-3 days.