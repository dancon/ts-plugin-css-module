Is your feature request related to a problem? Please describe.
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

As less-loader says, I can choose webpack resovler by prepending my @import path with ~, then the plugin does not work as expected.

Describe the solution you'd like
A clear and concise description of what you want to happen.

In less file:

@import '~styles/variables.less';

// some code
In tsconfig.json

{
    "compilerOptions": {
         ...
         "paths":  {
              "styles/*": [path to styles folder]
         }
         ...
   }
}
In webpack.config file I also defined resolver.alias

"styles": path to styles folder
when the plugin detect a @import path start begin ~, deal it with paths defined in tsconfig.json

Describe alternatives you've considered
A clear and concise description of any alternative solutions or features you've considered.

Now, I just use relative path to make it work, but it's ugly and nonportable.

Additional context
Add any other context or screenshots about the feature request here.
