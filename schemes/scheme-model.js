const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep,
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
    return (
        db('schemes as sch')
            .where('sch.id ', '=', id)
            .join('steps as st', 'sch.id', 'st.scheme_id')
            .select(
                'sch.scheme_name',
                'st.step_number',
                'st.instructions',
                'st.id as Step ID'
            )
            .orderBy('st.step_number')
    );
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(([id]) => findById(id));
}

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(amt => (amt > 0 ? findById(id) : null));
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
}

function addStep(stepData, id) {
    return db('steps')
        .insert({ ...stepData, scheme_id: id })
        .then(([id]) => findStepById(id));
}

function findStepById(id) {
    return db('steps')
        .where({ id })
        .first();
}
