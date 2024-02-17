from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        if email.endswith('@iiitvadodara.ac.in'):
            # Redirect to the homepage after successful login
            return redirect(url_for('homepage'))
        else:
            return render_template('login.html', show_popup=True)
    return render_template('login.html', show_popup=False)
    
@app.route('/homepage')
def homepage():
    return render_template('homepage.html')

if __name__ == '__main__':
    app.run(debug=True)