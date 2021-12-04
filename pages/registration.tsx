import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";

import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  presentedName: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
type stringOrUndefinendOrNull = string | undefined | null;
interface IUserDetails {
  email: stringOrUndefinendOrNull;
  firstName: stringOrUndefinendOrNull;
  lastName: stringOrUndefinendOrNull;
}

export default function RegistrationForm() {
  const [session, loading] = useSession();
  const [user, setUser] = useState<IUserDetails>({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (!loading && session!.user) {
      const loggedInUser = session!.user;
      const userFullName = session?.user.name?.split(" ");
      setUser({
        email: loggedInUser.email,
        firstName: userFullName?.[0],
        lastName: userFullName?.[1],
      });
    }
  }, [session, loading]);
  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      presentedName: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          disabled
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="firstName"
          disabled
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="lastName"
          disabled
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id="presentedName"
          name="presentedName"
          label="presentedName"
          value={formik.values.presentedName}
          onChange={formik.handleChange}
          error={
            formik.touched.presentedName && Boolean(formik.errors.presentedName)
          }
          helperText={
            formik.touched.presentedName && formik.errors.presentedName
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
}