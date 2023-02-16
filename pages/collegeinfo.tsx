import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

const ITEMS_PER_PAGE = 500;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { history: [] } };
  }
  const coldata = await prisma.collegedata.findMany({ take: ITEMS_PER_PAGE });
  return {
    props: { coldata },
  };
};

export type CollegedataProps = {
  id: String;
  ADDR: String;
  ADMINURL: String;
  APPLURL: String;
  ATHURL: String;
  C15BASIC: String;
  C18BASIC: String;
  C21BASIC: String;
  C21ENPRF: String;
  C21IPGRD: String;
  C21IPUG: String;
  C21SZSET: String;
  C21UGPRF: String;
  CARNEGIE: String;
  CBSA: String;
  CBSATYPE: String;
  CCBASIC: String;
  CHFNM: String;
  CHFTITLE: String;
  CITY: String;
  CLOSEDAT: String;
  CNGDSTCD: String;
  CONTROL: String;
  COUNTYCD: String;
  COUNTYNM: String;
  CSA: String;
  CYACTIVE: String;
  DEATHYR: String;
  DEGGRANT: String;
  DFRCGID: String;
  DFRCUSCG: String;
  DISAURL: String;
  DUNS: String;
  EIN: String;
  F1SYSCOD: String;
  F1SYSNAM: String;
  F1SYSTYP: String;
  FAIDURL: String;
  FIPS: String;
  GENTELE: String;
  GROFFER: String;
  HBCU: String;
  HDEGOFR1: String;
  HLOFFER: String;
  HOSPITAL: String;
  IALIAS: String;
  ICLEVEL: String;
  INSTCAT: String;
  INSTNM: String;
  INSTSIZE: String;
  LANDGRNT: String;
  LATITUDE: String;
  LOCALE: String;
  LONGITUD: String;
  MEDICAL: String;
  NECTA: String;
  NEWID: String;
  NPRICURL: String;
  OBEREG: String;
  OPEFLAG: String;
  OPEID: String;
  OPENPUBL: String;
  POSTSEC: String;
  PSEFLAG: String;
  PSET4FLG: String;
  RPTMTH: String;
  SECTOR: String;
  STABBR: String;
  TRIBAL: String;
  UGOFFER: String;
  UNITID: String;
  VETURL: String;
  WEBADDR: String;
  ZIP: String;
};

type Props = {
  coldata: CollegedataProps[];
};

const DialogCards: React.FC<Props> = ({ coldata }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  const handleClickOpen = (index: number) => {
    setSelectedCard(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexGrow: 1, margin: "2rem" }}>
        <Grid container spacing={3}>
          {coldata.map((data, i) => (
            <Grid item xs={3} key={i}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleClickOpen(i)}
              >
                <CardContent
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h5">{data.INSTNM}</Typography>
                  <Typography>{data.ADDR}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">
            {selectedCard !== null
              ? coldata[selectedCard].INSTNM
              : "No college selected"}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {selectedCard !== null
                ? `${coldata[selectedCard].ADDR} - ${coldata[selectedCard].CITY}, ${coldata[selectedCard].STABBR}`
                : "Please select a college to view its details."}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DialogCards;
