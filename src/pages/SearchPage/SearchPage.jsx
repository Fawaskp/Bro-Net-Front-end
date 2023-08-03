import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

function SearchPage() {
    const data = [
        {
            label: "User",
            value: "user",
        },
        {
            label: "Project",
            value: "project",
        },
    ];

    return (
        <div className='mx-36 my-20' >
            <Tabs value="html" orientation="vertical">
                <TabsHeader className="w-56 rounded-10 p-5">
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}

export default SearchPage
