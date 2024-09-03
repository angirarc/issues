import express from 'express'
import type { Issue } from './types';

const app = express();

app.use(express.json()); 

let issues: Issue[] = [
    {
        id: 1,
        title: 'Issue 1',
        description: 'Description 1'
    },
    {
        id: 2,
        title: 'Issue 2',
        description: 'Description 2'
    },
    {
        id: 3,
        title: 'Issue 3',
        description: 'Description 3'
    },
    {
        id: 4,
        title: 'Issue 4',
        description: 'Description 4'
    },
    {
        id: 5,
        title: 'Issue 5',
        description: 'Description 5'
    }
];

app.get('/issues', (_: express.Request, res: express.Response) => {
    res.send(issues);
});

app.post('/issues', (req: express.Request, res: express.Response) => {
    if (req.body.title && req.body.description) {
        let issue = {
            id: issues.length + 1,
            title: req.body.title,
            description: req.body.description
        };
        issues.push(issue);

        return res.send(issue);
    } else {
        return res.status(500).send({ error: 'Missing title or description' });
    }
});

app.get('/issues/:id', (req: express.Request, res: express.Response) => {
    let id = Number(req.params.id);
    let issue = issues.find(i => i.id === id);

    if (!issue)
        return res.status(404).send({ error: 'Issue not found' });

    return res.send(issue);
});

app.patch('/issues/:id', (req: express.Request, res: express.Response) => {
    let id = Number(req.params.id);
    let issue = issues.find(i => i.id === id);

    if (!issue)
        return res.status(404).send({ error: 'Issue not found' });

    if (req.body.title && req.body.description) {
        issue.title = req.body.title;
        issue.description = req.body.description;
        issues[id - 1] = issue;

        return res.send(issue);
    } else {
        return res.status(500).send({ error: 'Missing title or description' });
    }
});

app.delete('/issues/:id', (req: express.Request, res: express.Response) => {
    let id = Number(req.params.id);
    let issue = issues.find(i => i.id === id);
    if (!issue)
        return res.status(404).send({ error: 'Issue not found' });

    issues = issues.filter(i => i.id !== id);

    return res.send({ success: true });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});