#!/usr/bin/env node
Object.prototype.print = function () { console.log('\n' + this.toString()); }

var resources = {
  '/animals/tom': { name: 'Tom', species: 'Cat' },
};

'GET'.print();
// GET /animals/tom
respond(200, JSON.stringify(resources['/animals/tom']));


'PUT'.print();
// PUT /animals/jerry
resources['/animals/jerry'] = JSON.parse('{ "name": "Jerry", "species": "Mouse" }');
respond(201);

// PUT /animals/tom
resources['/animals/tom'] = JSON.parse('{ "name": "Tom", "species": "Cat", "miceCaught": 5 }');
respond(200, JSON.stringify(resources['/animals/tom']));


'PATCH'.print();
// PATCH /animals/tom
resource = resources['/animals/jerry'];
patch = JSON.parse('{ "prop": "name", "find": "r", "replace": "f" }');
resource[patch.prop] = resource[patch.prop].replace(patch.find, patch.replace);
respond(200, JSON.stringify(resource));

// PATCH /animals/tom
resource = resources['/animals/jerry'];
patch = JSON.parse('{ "prop": "name", "find": "r", "replace": "f" }');
resource[patch.prop] = resource[patch.prop].replace(patch.find, patch.replace);
respond(200, JSON.stringify(resource));


'DELETE'.print();
// DELETE /animals/jerry
delete resources['/animals/jerry'];
respond(204);


'POST'.print();
// POST /animals/tom
resources['/animals/tom'].miceCaught += 1;
respond(200, JSON.stringify(resources['/animals/tom']));

// POST /animals/tom
resources['/animals/tom'].miceCaught += 1;
respond(200, JSON.stringify(resources['/animals/tom']));

// POST /animals
newResourceUri = '/animals/' + (Object.keys(resources).length + 1);
resources[newResourceUri] = JSON.parse('{ "name": "Pluto", "species": "Dog" }');
respond(201, JSON.stringify({ location: newResourceUri }));


function respond(statusCode, representation) {
  console.log('  ' + statusCode + ": " + (representation || '(empty)'));
}
