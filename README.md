# sw - Star Wars test progect

## Run
1. clone the repo
2. In the root folder run
```
yarn install
yarn dev
```

## Demo
### "Production"
https://sw-sigma.vercel.app/

### PR builds
There is a preview version on every PR. The lint is in the comment from @vercel

## Runt tests
you can run all test `yarn test`, unit `test:unit` or e2e `test:e2e`

## Packages

### client
creat-react-app project

### server
node js + express

## CI
On every PR I build both BE and FE packeges, lint and run tests both unit and e2e.