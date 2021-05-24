import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    customTabIndicator: {
        backgroundColor: "white"
    }
}));

export default function TechTabs() {
    const classes = useStyles();
    const history = useHistory();

    const [value, setValue] = useState<number>(0);

    const handlePageChange = (page: string, value: number) => {
        history.push(page);
        setValue(value);
    };

    const tabs: { label: string, page: string }[] = [
        { label: "Main Page", page: '/' },
        { label: "Official Page", page: '/official' }
    ]

    return (
        <div className={classes.root}>
            <Tabs variant={"fullWidth"} value={value} aria-label="simple tabs example" classes={{
                indicator: classes.customTabIndicator
            }} >
                {tabs.map((t, index) => <Tab label={t.label} onClick={() => handlePageChange(t.page, index)} />)}
            </Tabs>
        </div >
    );
}