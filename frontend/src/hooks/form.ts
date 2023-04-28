export  (submitForm) = async (e: any) => {
  e.preventDefault();
  const value = e.target[0].value;
  if (!isNaN(value)) {
    // true if its a number, false if not
    toast.error("Please enter a emoji");
    return;
  }
  try {
    const { data } = await axios.post(`api/comments/new/${id}`, {
      text,
      authorId: user?.username,
    });
    if (data.success === true) {
      setText("");
      toast.success("Comment posted successfully!");
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      const error = data.message;
      toast.error(error);
    }
  } catch (error: any) {
    if (error) {
      const zodError = error.response.data.issues;

      if (zodError) {
        const errors = zodError.map((err: any) => err.message);
        console.log(zodError);
        errors.forEach((error: any) => {
          toast.error(error);
        });
      }
    }
  }
};
