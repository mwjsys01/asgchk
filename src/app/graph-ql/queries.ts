import gql from 'graphql-tag';

export const GetQuery1 = gql`
query get_head {
  tblheader(where: {status: {_in: ["new","edit"]}}) {
    headid
    indate
    vendor
    cnt
    created_at
    updated_at
    status
    venname
  }
}`;
export const UpdateStatus = gql`
mutation update_status($headid: Int!,$now: timestamptz!) {
  update_tblheader(where: {headid: {_eq: $headid}},
                   _set: {status: "edit", updated_at: $now}) {
    affected_rows
  }
}`;
export const GetQuery2 = gql`
query get_detail($headid: Int!) {
  tbldetail(where: {headid: {_eq: $headid}}, order_by: {packno: asc}) {
    packno
    detid
    gcode
    quant
    realg
    realq
    result
  }
}`;
export const UpdateDetail = gql`
mutation update_detail($detid: Int!,$res: String,$reg: String,$req: Int) {
  update_tbldetail(where: {detid: {_eq: $detid}},
                   _set: {result: $res, realg: $reg, realq: $req}) {
    affected_rows
  }
}`;