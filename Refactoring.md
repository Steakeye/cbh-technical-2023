# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The main am of my refactor was to ensure existing functionality was preserved but break up the behaviour into discrete blocks of responsibility. Even if there were bugs present, they would be preserved, according to the requirement:

> make it easier to read and understand without changing its functionality
 
To that end, I made sure that I looked for bugs and included them in code coverage! If you're touching code that is depended upon, like a library, it's possible that fixing existing bugs might have unintended consequences if the code consuming your code is working around your existing bugs!

The way I broke down the function was based mostly on the Single Responsibility Principle and a tiy bit of DRY where it made sense. In addition to these patterns, it made sense to reorder the flow to make it clearer how the function handled the most basic of missing requirements; namely, returning early with a default value if no valid argument is provided.

If you look at my git commit history you will see that I wrote test coverage before I started any refactor; this was very intentional to ensure that my refactor was not going to cause a regression in behaviour.

You will also notice that I covered a lot of edge cases in my tests that highlight some unexpected behaviour; even though I consider some resulting values to be bugs, I have kept the functionality consistent with the original implementation, but I would definitely ask for further clarity on how these edge cases should be handled so that this `deterministicPartitionKey` function is more resilient safe, and therefore more usable. My minimum expectation is that it should either return a hashed value or '0', never anything else; if it were to return another value, it should probably be null/undefined.

Some functions have been created, not to reuse an implementation detail but to help the code self-document; there is a minor trade-off between the overhead of misdirection and breaking down concepts into smaller chunks of logic that are easier to compartmentalise but viewed as a cohesive composition.

Even while I have tried to use descriptive function names to assist comprehension of what the code is doing, I have added a few comments within the body of the main function to further clarify 