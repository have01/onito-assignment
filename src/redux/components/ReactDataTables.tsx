import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";

export function DataTable({ ...props }: Config) {
    console.log("props!!", props)
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        const dt = new DataTables(tableRef.current!, props);
        return () => {
            dt.destroy();
        };
    }, [props]);

    return <table ref={tableRef} />;
}

export default DataTable;
