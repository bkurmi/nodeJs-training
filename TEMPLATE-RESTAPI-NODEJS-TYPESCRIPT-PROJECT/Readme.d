1. Compile using tsc which will generate tscconfig file
2. tsconfig file has 2 important properties to be updated i.e. 
    a. outDir (to generate all the compiles js files from ts file atone location defined inoutDir) , 
    b. rootDir - to set location of package src (post restructuring, allowing node to consider and read that src as root dir)
3. At the end all ts files need to be compiled to JS and node will understand and run JS files only.
4. scripts in package.json START script will need to contain the path of the js root file i.e. app.js


Benefit of ts
--------------
It shows error in the code by introduction of type safety feature. Not mal JS wont show nay error.

Local setup
--------------
tsc
node app.js