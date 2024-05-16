describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('https://rianaali.github.io/CSE110-SP24-Lab6-Template/');
    });


    test('Add New Note', async () => {
      let prevNoteCount = await page.$$eval('.note', notes => notes.length);
        await page.click('.add-note');
        let currNoteCount = await page.$$eval('.note', notes => notes.length);
        expect(currNoteCount).toBe(prevNoteCount+1);
      });
    
      test('Edit new note', async () => {

        await page.click('.add-note');
        await page.click('.note');
        await page.type('.note', 'I am typing a really cool note right now.');
        await page.keyboard.press('Tab');
        let noteContent = await page.$eval('.note', note => note.value);

       
        expect(noteContent).toBe('I am typing a really cool note right now.');
      });

      test('Edit existing note', async () => {
        const noteExists = await page.$$eval('.note', notes => notes.length > 0);
        expect(noteExists).toBe(true);

        let oldContent = await page.$eval('.note', note => note.value);


        await page.click('.note');
        let newContent = ' This is so fun! :)';
        await page.type('.note', newContent);
        await page.keyboard.press('Tab');
        let currContent = await page.$eval('.note', note => note.value);
        expect(currContent).toBe(oldContent + newContent);
      });

      test('Notes saved locally', async () => {
        let notes = await page.$$('note');
        let noteMessages = [];
        for(let i = 0; i < notes.length; i++)
        {
          noteMessages.push(notes[i].value);
        }
        await page.reload();
        let reloadNotes = await page.$$('note');
        let reloadMessages = [];
        for(let i = 0; i < reloadNotes.length; i++)
        {
          reloadMessages.push(reloadNotes[i].value);
        }


        expect(JSON.stringify(noteMessages)).toBe(JSON.stringify(reloadMessages));


});

test('Delete note', async () => {
    let prevNoteCount = await page.$$eval('.note', notes => notes.length);
    await page.click('.note', { clickCount: 2 });
    let currNoteCount = await page.$$eval('.note', notes => notes.length);
    expect(currNoteCount).toBe(prevNoteCount-1);

});


});  