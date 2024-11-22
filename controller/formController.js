    const formModel = require(`../model/formModel.js`); 

    class Form {
        constructor() {
            this.formModel = formModel; 
            this.currentDate = new Date();
            this.currentDay = this.currentDate.getDate(); 
            this.result = null;
        }

        checkDay(date) {
            return date === this.currentDay;
        }

        async postForm(req, res) {
            const epost = req.body.epost;
            const svar = req.body.svar;
            const date = parseInt(req.params.day, 10); // Ensure `date` is an integer

            console.log(svar, epost)

            try {
                if (!this.checkDay(date)) {
                    this.result = await this.formModel.create({ epost, svar, date }); 
                    res.status(200).redirect('/'); 
                    console.log("Form submitted")
                } else {
                    console.log("Form submission is only allowed for the current day")
                //   res.status(400).render('notapproved', { 
                //       message: "Form submission is only allowed for the current day." 
            //     });
                }
            } catch (err) {
                console.error("Error saving form data:");
            //  res.status(500).render('notapproved', { 
            //      message: "An error occurred. Please check your email format and ensure your answer has more than 5 characters." 
            //   });
            console.log("An error occurred. Please check your email format and ensure your answer has more than 5 characters")
            }
        }
    }

    module.exports = Form; 
