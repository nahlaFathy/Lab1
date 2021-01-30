const { program } = require('commander');
const low=require('lowdb')
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json')
const db=low(adapter)
db.defaults({notes:[]}).write();
const shortid = require('shortid');

program
.command('add')
.requiredOption('--title <Type>')
.requiredOption('--descrip <Type>')
.description('new note')
.action((options)=>{
    db.get('notes')
    .push({id:shortid.generate(),status:'to-do',title:options.title ,desc:options.descrip})
    .write()
})


//node ./index.js add  --title todo --descrip 4
program
.command('display')
.description('show all notes')
.action(()=>{
   console.log( db.getState());
})

//node ./index.js display
program
.command('EditTitle')
.description('edit note title')
.requiredOption('--id  <str>')
.requiredOption('--newTitle <str>')
.action((option)=>{
    db.get('notes')
    .find({id:option.id})
    .assign({title:option.newTitle})
    .write()
})

//  node ./index.js EditTitle --id XOWH6BjQO --newTitle new_title
program
.command('EditDesc')
.description('edit note description')
.requiredOption('--id  <str>')
.requiredOption('--newDesc <str>')
.action((option)=>{
    db.get('notes')
    .find({id:option.id})
    .assign({desc:option.newDesc})
    .write()
})

//node ./index.js EditDesc --id XOWH6BjQO --newDesc  new_Desc

program
.command('delete')
.description('delete note')
.requiredOption('--id <str>')
.action((option)=>{
    db.get('notes')
    .remove({id:option.id})
    .write()
})
//node ./index.js delete  --id hQXk_WSwc
program
.command('EditStatus')
.description('Edit note Status')
.requiredOption('--id <str>')
.requiredOption('--newStatus <str>')
.action((option)=>{
    db.get('notes')
    .find({id:option.id})
    .assign({status:option.newStatus})
    .write()
})

//node ./index.js EditStatus --id XOWH6BjQO --newStatus new_status
program
.command('displayWzStatus')
.description('Display note with status')
.requiredOption('--status <str>')
.action((option)=>{
  console.log( JSON.stringify( db.get('notes')
    .find({status:option.status})));
})

//
program.parse(process.argv)