
const paths = [];

function checkValidMove( place ) {
    if ( place[0] < 0 || place[0] > 7 || place[1] < 0 || place[1] > 7 ){
        return false;
    }
    return place;
}

function moveUpLeft( from ) {
    const dest = [from[0] - 1, from[1] - 2];
    return checkValidMove(dest);
}

function moveTwoUpLeft( from ){
    const dest = [from[0] - 2, from[1] - 1];
    return checkValidMove(dest);
}

function moveUpRight( from ) {
    const dest = [from[0] - 1, from[1] + 2];
    return checkValidMove(dest);
}

function moveTwoUpRight( from ) {
    const dest = [from[0] - 2, from[1] + 1];
    return checkValidMove(dest);
}

function moveDownLeft( from ) {
    const dest = [from[0] + 1, from[1] - 2];
    return checkValidMove(dest);
}

function moveTwoDownLeft( from ) {
    const dest = [from[0] + 2, from[1] - 1];
    return checkValidMove(dest);
}

function moveDownRight( from ) {
    console.log(`from: ${from}`)
    const dest = [from[0] + 1, from[1] + 2];
    console.log(dest)
    return checkValidMove(dest);
}

function moveTwoDownRight( from ) {
    const dest = [from[0] + 2, from[1] + 1];
    return checkValidMove(dest);
}

function checkedMove( move, chechedList ) {
    return chechedList.every( checked => checked.toString() !== move.toString() );
}

async function createPaths( visited, start, end ) {
    console.log(`start ${start}`)

    //check All Possible Moves = check if they haven't been checked and return only
    // if they were not visited
    //Add them to checkedNext - already filtered
    //Add all checkNext to visited
    //check if they are not end - 
    //  Yes - add to start and join - add to lists and return Lists 
    //  No - loop throught each
    //      -send it to check any path an return lists[[][]]
    //      -From returned lists - take the start and join it to every returned list 
    //      -add those joined lists to this ones lists
    //   Return the Lists of this one
    //
    //check if any of them is the destination and return if yes
    //go in a while and call each vertex's possible paths forward
    //keep track of visited paths via backTrack
    //Each returned backTrack goes into the paths array of path arrays
    //once all paths are finished, calculate the shortes

    const paths = [];
    let checkNext = [];



    let upLeft = moveUpLeft( start );
    if ( checkedMove( upLeft, visited ) && upLeft ){
        checkNext.push(upLeft);
        visited.push(upLeft);
    }

    let upTwoLeft = moveTwoUpLeft( start );
    if ( checkedMove( upTwoLeft, visited ) && upTwoLeft ){
        checkNext.push(upTwoLeft);
        visited.push(upTwoLeft);
    }

    let upRight = moveUpRight( start );
    if ( checkedMove( upRight, visited ) && upRight ){
        checkNext.push(upRight);
        visited.push(upRight);
    }

    let upTwoRight = moveTwoUpRight( start );
    if ( checkedMove( upTwoRight, visited ) && upTwoRight ){
        checkNext.push(upTwoRight);
        visited.push(upTwoRight);
    }

    let downLeft = moveDownLeft( start );
    if ( checkedMove( downLeft, visited ) && downLeft ){
        checkNext.push(downLeft);
        visited.push(downLeft);
    }

    let downTwoLeft = moveTwoDownLeft( start );
    if ( checkedMove( downTwoLeft, visited ) && downTwoLeft ){
        checkNext.push(downTwoLeft);
        visited.push(downTwoLeft);
    }

    let downRight = moveDownRight( start );
    console.log(`downRight: ${downRight}`);
    if ( checkedMove( downRight, visited ) && downRight ){
        console.log(`in`)
        checkNext.push(downRight);
        visited.push(downRight);
    }
    
    let downTwoRight = moveTwoDownRight( start );
    console.log(`downTwoRight: ${downRight}`);
    if ( checkedMove( downTwoRight, visited ) && downTwoRight ){
        checkNext.push(downTwoRight);
        visited.push(downTwoRight);
    }

    visited.concat(checkNext);
    console.log(`CheckNext ${checkNext}`);
    console.log(`visited ${visited}`);


    for ( let i = 0; i < checkNext.length; i++ ) {
        console.log(`check: ${checkNext[i]}`)
        console.log(`check string ${checkNext[i].toString()} end toSTring ${end.toString()}`)
        if ( checkNext[i].toString() === end.toString() ){
            let final = start.concat(end);
            paths.push(final);
            break;
        }
    }

    if ( checkNext.length === 0 )
        return paths;
    else{
        while( checkNext[0] ){
            let startList = [start];
            let anotherPath = await createPaths( visited, checkNext[0], end );
            if( anotherPath.length === 0 )
                continue;

            for ( let path in anotherPath ) {
                paths.push( startList.concat( path ) )
            }

            checkNext.shift();
        }

        return paths;
    }

}

const knightMoves = ( start, end ) => {
    const visited = [start];
    console.log(`begin ${start}`)
    return createPaths(visited, start, end );
}

const thePaths = new Promise( ( resolve, reject ) => {
    resolve(knightMoves([0,0], [3,3]));
    reject();
});

thePaths.then(
    (value) => {
        console.log(value);
    }
).
catch((console.error()
));