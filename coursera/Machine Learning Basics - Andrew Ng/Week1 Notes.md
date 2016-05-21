# What is Machine Learning? 

Two definitions of Machine Learning are offered. Arthur Samuel described it as: "the field of study that gives computers the ability to learn without being explicitly programmed." This is an older, informal definition.

Tom Mitchell provides a more modern definition: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."

Example: playing checkers.
* E = the experience of playing many games of checkers
* T = the task of playing checkers.
* P = the probability that the program will win the next game.

# Supervised Learning
In supervised learning, we are given a data set and already know what our correct output should look like, having the idea that there is a relationship between the input and the output. 

Supervised learning problems are categorized into "**regression**" and "**classification**" problems. In a **regression** problem, we are trying to predict results within a **continuous** output, meaning that we are trying to map input variables to some **continuous** function. In a **classification** problem, we are instead trying to predict results in a **discrete** output. In other words, we are trying to map input variables into **discrete** categories.

**Example 1**: 

Given data about the size of houses on the real estate market, try to predict their price. Price as a function of size is a *continuous* output, so this is a regression problem. 

We could turn this example into a classification problem by instead making our output about whether the house "sells for more or less than the asking price." Here we are classifying the houses based on price into two *discrete* categories.

**Example 2**:
       (a)Regression     - Given a picture of Male/Female, We have to predict his/her age on the basis of given picture.
       (b)Classification - Given a picture of Male/Female, We have to predict Whether He/She is of Highschool,College, Graduate
                           age.
       Another Example for Classification - Banks have to decide whether or not to give a loan to someone on the basis
                                            of his credit history.
# Unsupervised Learning

Unsupervised learning, on the other hand, allows us to approach problems with little or no idea what our results should look like. We can derive structure from data where we don't necessarily know the effect of the variables.

We can derive this structure by **clustering** the data based on relationships among the variables in the data.

With unsupervised learning there is no feedback based on the prediction results, i.e., there is no teacher to correct you.

**Example**:
 
*Clustering*: Take a collection of 1000 essays written on the US Economy, and find a way to automatically group these essays into a small number that are somehow similar or related by different variables, such as word frequency, sentence length, page count, and so on.

Another, non-Clustering example, is the "Cocktail Party Algorithm" which can find structure in messy data- like identifying individual voices and music from a mesh of sounds at a cocktail party.
https://en.wikipedia.org/wiki/Cocktail\_party\_effect
Here is an answer on Quora to enhance your understanding. : https://www.quora.com/What-is-the-difference-between-supervised-and-unsupervised-learning-algorithms

----------------------------------

# Linear Regression with One Variable


# Model Representation
Recall that in *regression problems*, we are taking input variables and trying to fit the output onto a *continuous* expected result function. 

Linear regression with one variable is also known as "univariate linear regression."

Univariate linear regression is used when you want to predict a **single output** value from a **single input** value. We're doing **supervised learning** here, so that means we already have an idea about what the input/output cause and effect should be. 

# The Hypothesis Function

Our hypothesis function has the general form:
$$h_\theta(x) = \theta_0 + \theta_1 x$$

Note that this is like the equation of a straight line. 
We give to $$h_\theta(x)$$ values for $$\theta_0$$ and $$\theta_1$$ to get our output 'y'. In other words, we are trying to create a function called $$h_\theta$$ that is trying to map our input data (the x's) to our output data (the y's).

Example:

<table><tr><th>x (input)</th><th>y (output)</th></tr>
<tr><td>0</td><td>4</td></tr>
<tr><td>1</td><td>7</td></tr>
<tr><td>2</td><td>7</td></tr>
<tr><td>3</td><td>8</td></tr>
</table>

Now we can make a random guess about our $$h_\theta$$ function: $$\theta_0 = 2$$ and $$\theta_1 = 2$$. The hypothesis function becomes $$h_\theta(x) = 2 + 2 x$$. 

So for input of 1 to our hypothesis, y will be 4. This is off by 3.
Note that we will be trying out various values of $$\theta_0$$ and $$\theta_1$$ to try to find values which provide the best possible "fit" or the most representative "straight line" through the data points mapped on the x-y plane.

# Cost Function
We can measure the accuracy of our hypothesis function by using a **cost function**. This takes an average (actually a fancier version of an average) of all the results of the hypothesis with inputs from x's compared to the actual output y's. 

$$J(\theta_0, \theta_1) = \dfrac {1}{2m} \displaystyle \sum _{i=1}^m \left (h_\theta (x_{i}) - y_{i} \right)^2$$

To break it apart, it is $$\frac{1}{2} \bar{x}$$ where $$\bar{x}$$ is the mean of the squares of $$h_\theta (x_{i}) - y_{i}$$, or the difference between the predicted value and the actual value.

This function is otherwise called the "Squared error function", or "Mean squared error". The mean is halved ($$\frac{1}{2m}$$) as a convenience for the computation of the gradient descent, as the derivative term of the square function will cancel out the  $$\frac{1}{2}$$ term.

Now we are able to concretely measure the accuracy of our predictor function against the correct results we have so that we can predict new results we don't have.

If we try to think of it in visual terms, our training data set is scattered on the x-y plane. We are trying to make straight line (defined by $$h_\theta(x)$$) which passes through this scattered set of data. Our objective is to get the best possible line. The best possible line will be such so that the average squared vertical distances of the scattered points from the line will be the least. In the best case, the line should pass through all the points of our training data set. In such a case the value of $$J(\theta_0, \theta_1)$$ will be 0.

# Gradient Descent

So we have our hypothesis function and we have a way of measuring how accurate it is. Now what we need is a way to automatically improve our hypothesis function. That's where gradient descent comes in.

Imagine that we graph our hypothesis function based on its fields $$\theta_0$$ and $$\theta_1$$ (actually we are graphing the cost function for the combinations of parameters). This can be kind of confusing; we are moving up to a higher level of abstraction. We are not graphing x and y itself, but the parameter range of our hypothesis function and the cost resulting from selecting particular set of parameters. 

We put $$\theta_0$$ on the x axis and $$\theta_1$$ on the y axis, with the cost function on the vertical z axis. The points on our graph will be the result of the **cost function** using our hypothesis with those specific theta parameters.

We will know that we have succeeded when our cost function is at the very bottom of the pits in our graph, i.e. when its value is the minimum. 

The way we do this is by taking the **derivative** (the line tangent to a function) of our cost function. The slope of the tangent is the derivative at that point and it will give us a direction to move towards. We make steps down that derivative by the parameter $$\alpha$$, called the **learning rate**.

The gradient descent algorithm is:

$$ \text{repeat until convergence:} $$

$$ \theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta_0, \theta_1)$$

**for j=0 and j=1**

Intuitively, this could be thought of as:

$$\text{repeat until convergence:}$$

$$ \theta_j := \theta_j - \alpha \[\text{Slope of tangent aka derivative in j dimension}\]$$

# Gradient Descent for Linear Regression

When specifically applied to the case of linear regression, a new form of the gradient descent equation can be derived. We can substitute our actual cost function and our actual hypothesis function and modify the equation to (the derivation of the formulas are out of the scope of this course, but a really great one can be [found here](https://math.stackexchange.com/questions/70728/partial-derivative-in-gradient-descent-for-two-variables/189792#189792)):

$$\begin{align*}
\text{repeat until convergence: } \lbrace & \newline 
\theta_0 := & \theta_0 - \alpha \frac{1}{m} \sum\limits_{i=1}^{m}(h_\theta(x_{i}) - y_{i}) \newline
\theta_1 := & \theta_1 - \alpha \frac{1}{m} \sum\limits_{i=1}^{m}\left((h_\theta(x_{i}) - y_{i}) x_{i}\right) \newline
\rbrace&
\end{align*}$$

where $$m$$ is the size of the training set, $$\theta_0$$ a constant that will be changing simultaneously with $$\theta_1$$ and $$x_{i}, y_{i}$$ are values of the given training set (data).

Note that we have separated out the two cases for $$\theta_j$$ into separate equations for $$\theta_0$$ and $$\theta_1$$; and that for $$\theta_1$$ we are multiplying $$x_{i}$$ at the end due to the derivative.

The point of all this is that if we start with a guess for our hypothesis and then repeatedly 
 apply these gradient descent equations, our hypothesis will become more and more accurate.

## Gradient Descent for Linear Regression: visual worked example

[See this video](https://www.youtube.com/watch?v=WnqQrPNYz5Q) that some may find useful as it visualizes the improvement of the hypothesis as the error function reduces. 

# Frequently Asked Questions:

**Q: Why is the cost function about the sum of squares, rather than the sum of cubes?**

A: It might be easier to think of this as measuring the distance of two points. In this case, we are measuring the distance of two multi-dimensional values (i.e. the observed output value $$y_i$$ and the estimated output value $$\hat{y}_i$$). We all know how to measure the distance of two points $$(x_1, y_1)$$ and $$(x_2, y_2)$$, which is $$\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$$. If we have n-dimension then we want the positive square root of $$\sum_{i=1}^{n} (x_i-y_i)^2$$. That's where the sum of squares comes from. (see also [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance))

The sum of squares isn’t the only possible cost function, but it has many nice properties. Squaring the error means that an overestimate is "punished" just the same as an underestimate: an error of -1 is treated just like +1, and the two equal but opposite errors can’t cancel each other. If we cube the error, we lose this property. Big errors are punished more than small ones, so an error of 2 becomes 4.

The squaring function is smooth (can be differentiated) and yields linear forms after differentiation, which is nice for optimization. It also has the property of being “convex”. A convex cost function guarantees there will be a global minimum, so our algorithms will converge.

**Q: Why can’t I use 4th powers in the cost function? Don’t they have the nice properties of squares?**

A: Imagine that you are throwing darts at a dartboard, or firing arrows at a target. If you use the sum of squares as the error (where the center of the bulls-eye is the origin of the coordinate system), the error is the distance from the center. Now rotate the coordinates by 30 degree, or 45 degrees, or anything. The distance, and hence the error, remains unchanged. 4th powers lack this property, which is known as “rotational invariance”.

**Q: Why does 1/(2 * m) make the math easier?**

A: When we differentiate the cost to calculate the gradient, we get a factor of 2 in the numerator, due to the exponent inside the sum. This '2' in the numerator cancels-out with the '2' in the denominator, saving us one math operation in the formula.

# Linear Regression with Multiple Variables
# Multiple Features

Linear regression with multiple variables is also known as "multivariate linear regression".

We now introduce notation for equations where we can have any number of input variables.

$$
\begin{align*}
x_j^{(i)} &= \text{value of feature } j \text{ in the }i^{th}\text{ training example} \newline
x^{(i)}& = \text{the column vector of all the feature inputs of the }i^{th}\text{ training example} \newline
m &= \text{the number of training examples} \newline
n &= \left| x^{(i)} \right| \ - 1; \text{(the number of features)} 
\end{align*}
$$

Now define the multivariable form of the hypothesis function as follows, accomodating these multiple features:

$$
h_\theta (x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \theta_3 x_3 + \cdots + \theta_n x_n
$$

In order to have little intuition about this function, we can think about $$\theta_0$$ as the basic price of a house, $$\theta_1$$ as the price per square meter, $$\theta_2$$ as the price per floor, etc.
$$x_1$$ will be the number of square meters in the house, $$x_2$$ the number of floors, etc.

Using the definition of matrix multiplication, our multivariable hypothesis function can be concisely represented as:

$$
\begin{align*}
h_\theta(x) =
\begin{bmatrix}
\theta_0 \hspace{2em}  \theta_1 \hspace{2em}  ...  \hspace{2em}  \theta_n
\end{bmatrix}
\begin{bmatrix}
x_0 \newline
x_1 \newline
\vdots \newline
x_n
\end{bmatrix}
= \theta^T x
\end{align*}
$$

This is a vectorization of our hypothesis function for one training example; see the lessons on vectorization to learn more.



[**Note**: So that we can do matrix operations with theta and x, we will set $$x^{(i)}_0 = 1$$, for all values of $$i$$. This makes the two vectors 'theta' and $$x^{(i)}$$ match each other element-wise (that is, have the same number of elements: $$n + 1$$).]

**Note: this section of the Wiki is being re-written so that X is correctly handled as a matrix of size (m x n+1), with the training examples arranged as rows of X, and the hypothesis as a column vector of size (m x 1).**


The training examples are stored in $$X$$ row-wise, like such:

$$
\begin{align*}
X = 
\begin{bmatrix}
x^{(1)}_0 & x^{(1)}_1  \newline
x^{(2)}_0 & x^{(2)}_1  \newline
x^{(3)}_0 & x^{(3)}_1  
\end{bmatrix}
&
,\theta = 
\begin{bmatrix}
\theta_0 \newline
\theta_1 \newline
\end{bmatrix}
\end{align*}
$$

You can calculate the hypothesis as a column vector of size (m x 1) with:

$$
h_\theta(X) = X \theta
$$

**INCORRECT ADVICE FOLLOWS: For the rest of this page, and other pages of the wiki, $$X$$ will represent a matrix of training examples $$x^{(i)}$$ stored row-wise.**


# Cost function

For the parameter vector $$\theta$$ (of type $$\mathbb{R}^{n+1}$$ or in $$\mathbb{R}^{(n+1) \times 1}$$), the cost function is:

$$J(\theta) = \dfrac {1}{2m} \displaystyle \sum_{i=1}^m \left (h_\theta (x^{(i)}) - y^{(i)} \right)^2$$

The vectorized version is:

$$J(\theta) = \dfrac {1}{2m} (X\theta - \vec{y})^{T} (X\theta - \vec{y})$$

Where $$\vec{y}$$ denotes the vector of all y values.

# Gradient Descent for Multiple Variables

The gradient descent equation itself is generally the same form; we just have to repeat it for our 'n' features:

$$\begin{align*}
& \text{repeat until convergence:} \; \lbrace \newline 
\; & \theta_0 := \theta_0 - \alpha \frac{1}{m} \sum\limits_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_0^{(i)}\newline
\; & \theta_1 := \theta_1 - \alpha \frac{1}{m} \sum\limits_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_1^{(i)} \newline
\; & \theta_2 := \theta_2 - \alpha \frac{1}{m} \sum\limits_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_2^{(i)} \newline
& \cdots
\newline \rbrace
\end{align*}$$

In other words:

$$\begin{align*}
& \text{repeat until convergence:} \; \lbrace \newline 
\; & \theta_j := \theta_j - \alpha \frac{1}{m} \sum\limits_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)} \;  & \text{for j := 0..n}
\newline \rbrace
\end{align*}$$

## Matrix Notation

The Gradient Descent rule can be expressed as:

$$
\large
\theta := \theta - \alpha \nabla J(\theta)
$$

Where $$\nabla J(\theta)$$ is a column vector of the form:

$$\large
\nabla J(\theta)  = \begin{bmatrix}
\frac{\partial J(\theta)}{\partial \theta_0}   \newline
\frac{\partial J(\theta)}{\partial \theta_1}   \newline
\vdots   \newline
\frac{\partial J(\theta)}{\partial \theta_n} 
\end{bmatrix}
$$

The j-th component of the gradient is the summation of the product of two terms:

$$\begin{align*}
\; &\frac{\partial J(\theta)}{\partial \theta_j} &=&  \frac{1}{m} \sum\limits_{i=1}^{m}  \left(h_\theta(x^{(i)}) - y^{(i)} \right) \cdot x_j^{(i)} \newline
\; & &=& \frac{1}{m} \sum\limits_{i=1}^{m}   x_j^{(i)} \cdot \left(h_\theta(x^{(i)}) - y^{(i)}  \right) 
\end{align*}$$


Sometimes, the summation of the product of two terms can be expressed as the product of two vectors. 

Here, the term $$x_j^{(i)}$$ represents the $$m$$ elements of the $$j$$-th column $$\vec{x_j}$$ ($$j$$-th feature $$\vec{x_j}$$) of the training set $$X$$. 

The other term $$\left(h_\theta(x^{(i)}) - y^{(i)}  \right)$$ is the vector of the deviations between the predictions $$h_\theta(x^{(i)})$$ and the true values $$y^{(i)}$$. Re-writing $$\frac{\partial J(\theta)}{\partial \theta_j}$$, we have:

$$\begin{align*}
\; &\frac{\partial J(\theta)}{\partial \theta_j} &=& \frac1m  \vec{x_j}^{T} (X\theta - \vec{y}) \newline
\newline
\newline
\; &\nabla J(\theta) & = & \frac 1m X^{T} (X\theta - \vec{y}) \newline
\end{align*}$$

Finally, the matrix notation (vectorized) of the Gradient Descent rule is:

 $$
\large
\theta := \theta - \frac{\alpha}{m} X^{T} (X\theta - \vec{y})
$$

# Feature Normalization

We can speed up gradient descent by having each of our input values in roughly the same range. This is because $$\theta$$ will descend quickly on small ranges and slowly on large ranges, and so will oscillate inefficiently down to the optimum when the variables are very uneven.

The way to prevent this is to modify the ranges of our input variables so that they are all roughly the same. Ideally:

$$ -1 \le x_i \le 1 $$

or

$$ -0.5 \le x_i \le 0.5 $$

These aren't exact requirements; we are only trying to speed things up. The goal is to get all input variables into roughly one of these ranges, give or take a few.

Two techniques to help with this are **feature scaling** and **mean normalization**.  Feature scaling involves dividing the input values by the range (i.e. the maximum value minus the minimum value) of the input variable, resulting in a new range of just 1.  Mean normalization involves subtracting the average value for an input variable from the values for that input variable, resulting in a new average value for the input variable of just zero.  To implement both of these techniques, adjust your input values as shown in this formula:

$$
x_i := \dfrac{x_i - \mu_i}{s_i}
$$

Where $$\mu_i$$ is the **average** of all the values and $$s_i$$ is the maximum of the range of values *minus* the minimum or $$s_i$$ is the standard deviation.

Example: $$x_i$$ is housing prices in range 100-2000. Then, $$x_i := \dfrac{price-1000}{1900}$$, where 1000 is the average price and 1900 is the maximum (2000) minus the minimum (100).

## Quiz question #1 on Feature Normalization (Week 2, Linear Regression with Multiple Variables)
Your answer should be rounded to exactly two decimal places. Use a '.' for the decimal point, not a ','. The tricky part of this question is figuring out which feature of which training example you are asked to normalize. Note that the mobile app doesn't allow entering a negative number (Jan 2016), so you will need to use a browser to submit this quiz if your solution requires a negative number.

# Gradient Descent Tips

**Debugging gradient descent.** Make a plot with *number of iterations* on the x-axis. Now plot the cost function, $$J(\theta)$$ over the number of iterations of gradient descent. If $$J(\theta)$$ ever increases, then you probably need to decrease $$\alpha$$.

**Automatic convergence test.** Declare convergence if $$J(\theta)$$ decreases by less than $$E$$ in one iteration, where $$E$$ is some small value such as $$10^{-3}$$. However in practice it's difficult to choose this threshold value.

It has been proven that if learning rate $$\alpha$$ is sufficiently small, then $$J(\theta)$$ will decrease on every iteration. Andrew Ng recommends decreasing $$\alpha$$ by multiples of 3.

# Features and Polynomial Regression

We can improve our features and the form of our hypothesis function in a couple different ways.

We can **combine** multiple features into one. For example, we can combine $$x_1$$ and $$x_2$$ into a new feature $$x_3$$ by taking $$x_1 \cdot x_2$$. 

### Polynomial Regression

Our hypothesis function need not be linear (a straight line) if that does not fit the data well.

We can **change the behavior or curve** of our hypothesis function by making it a quadratic, cubic or square root function (or any other form). 

For example, if our hypothesis function is $$h_\theta(x) = \theta_0 + \theta_1 x_1$$ then we can simply **duplicate** the instances of $$x_1$$ to get the quadratic function $$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_1^2$$ or the cubic function  $$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_1^2 + \theta_3 x_1^3$$

In the cubic version, we have created new features $$x_2$$ and $$x_3$$ where $$x_2 = x_1^2$$ and $$x_3 = x_1^3$$.

To make it a square root function, we could do: $$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 \sqrt{x_1}$$

One important thing to keep in mind is, if you choose your features this way then feature scaling becomes very important.

eg. if $$x_1$$ has range 1 - 1000 then range of $$x_1^2$$ becomes 1 - 1000000 and that of $$x_1^3$$ becomes 1 - 1000000000 

# Normal Equation

The "Normal Equation" is a method of finding the optimum theta **without iteration.**

$$
\theta = (X^T X)^{-1}X^T y
$$

There is **no need** to do feature scaling with the normal equation.

Mathematical proof of the Normal equation requires knowledge of linear algebra and is fairly involved, so you do not need to worry about the details.

Proofs are available at these links for those who are interested:
  [Wikipedia](http://en.wikipedia.org/wiki/Linear_least_squares_(mathematics)) 
  [Eli Bendersky](http://eli.thegreenplace.net/2014/derivation-of-the-normal-equation-for-linear-regression)

The following is a comparison of gradient descent and the normal equation:

<table border=1>
<tr><th>Gradient Descent</th><th>Normal Equation</th></tr>
<tr><td>Need to choose alpha</td><td>No need to choose alpha</td></tr>
<tr><td>Needs many iterations</td><td>No need to iterate</td></tr>
<tr><td>$$O~(kn^2)$$</td><td>$$O~(n^3)$$, need to calculate inverse of $$X^TX$$ </td></tr>
<tr><td>Works well when n is large</td><td>Slow if n is very large</td></tr>
</table>

With the normal equation, computing the inversion has complexity $$\mathcal{O}(n^3)$$. So if we have a very large number of features, the normal equation will be slow. In practice, when n exceeds 10,000 it might be a good time to go from a normal solution to an iterative process.

### Normal Equation Noninvertibility

When implementing the normal equation in octave we want to use the 'pinv' function rather than 'inv.'

$$X^T X$$ may be **noninvertible**. The common causes are:

* Redundant features, where two features are very closely related (i.e. they are linearly dependent)
* Too many features (e.g. $$m \leq n$$). In this case, delete some features or use "regularization" (to be explained in a later lesson).

Solutions to the above problems include deleting a feature that is linearly dependent with another or deleting one or more features when there are too many features.

# Octave Tutorial
# Basic Operations
	%% Change Octave prompt  
	PS1('>> ');
	%% Change working directory in windows example:
	cd 'c:/path/to/desired/directory name'
	%% Note that it uses normal slashes and does not use escape characters for the empty spaces.

	%% elementary operations
	5+6
	3-2
	5*8
	1/2
	2^6
	1 == 2  % false
	1 ~= 2  % true.  note, not "!="
	1 && 0
	1 || 0
	xor(1,0)


	%% variable assignment
	a = 3; % semicolon suppresses output
	b = 'hi';
	c = 3>=1;

	% Displaying them:
	a = pi
	disp(a)
	disp(sprintf('2 decimals: %0.2f', a))
	disp(sprintf('6 decimals: %0.6f', a))
	format long
	a
	format short
	a


	%%  vectors and matrices
	A = [1 2; 3 4; 5 6]

	v = [1 2 3]
	v = [1; 2; 3]
	v = [1:0.1:2]  % from 1 to 2, with stepsize of 0.1. Useful for plot axes
	v = 1:6        % from 1 to 6, assumes stepsize of 1 (row vector)

	C = 2*ones(2,3)  % same as C = [2 2 2; 2 2 2]
	w = ones(1,3)    % 1x3 vector of ones
	w = zeros(1,3)
	w = rand(1,3)  % drawn from a uniform distribution 
	w = randn(1,3) % drawn from a normal distribution (mean=0, var=1)
	w = -6 + sqrt(10)*(randn(1,10000));  % (mean = -6, var = 10) - note: add the semicolon
	hist(w)     % plot histogram using 10 bins (default)
	hist(w,50)  % plot histogram using 50 bins
    % note: if hist() crashes, try "graphics_toolkit('gnu_plot')" 

	I = eye(4)    % 4x4 identity matrix

	% help function
	help eye
	help rand
	help help

# Moving Data Around

*Data files used in this section*: [featuresX.dat](https://raw.githubusercontent.com/tansaku/py-coursera/master/featuresX.dat), [priceY.dat](https://raw.githubusercontent.com/tansaku/py-coursera/master/priceY.dat)

	%% dimensions
	sz = size(A) % 1x2 matrix: [(number of rows) (number of columns)]
	size(A,1)  % number of rows
	size(A,2)  % number of cols
	length(v)  % size of longest dimension


	%% loading data
	pwd    % show current directory (current path)
	cd 'C:\Users\ang\Octave files'   % change directory 
	ls     % list files in current directory 
	load q1y.dat    % alternatively, load('q1y.dat')
	load q1x.dat
	who    % list variables in workspace
	whos   % list variables in workspace (detailed view) 
	clear q1y       % clear command without any args clears all vars
	v = q1x(1:10);  % first 10 elements of q1x (counts down the columns)
	save hello.mat v;   % save variable v into file hello.mat
	save hello.txt v -ascii; % save as ascii
	% fopen, fread, fprintf, fscanf also work  [[not needed in class]]

	%% indexing
	A(3,2)  % indexing is (row,col)
	A(2,:)  % get the 2nd row. 
			% ":" means every element along that dimension
	A(:,2)  % get the 2nd col
	A([1 3],:) % print all  the elements of rows 1 and 3

	A(:,2) = [10; 11; 12]     % change second column
	A = [A, [100; 101; 102]]; % append column vec
	A(:) % Select all elements as a column vector.

	% Putting data together 
	A = [1 2; 3 4; 5 6]
	B = [11 12; 13 14; 15 16] % same dims as A
	C = [A B]  % concatenating A and B matrices side by side
	C = [A, B] % concatenating A and B matrices side by side
	C = [A; B] % Concatenating A and B top and bottom

# Computing on Data

	%% initialize variables
	A = [1 2;3 4;5 6]
	B = [11 12;13 14;15 16]
	C = [1 1;2 2]
	v = [1;2;3]

	%% matrix operations
	A * C  % matrix multiplication
	A .* B % element-wise multiplication
	% A .* C  or A * B gives error - wrong dimensions
	A .^ 2 % element-wise square of each element in A
	1./v   % element-wise reciprocal
	log(v)  % functions like this operate element-wise on vecs or matrices 
	exp(v)
	abs(v)

	-v  % -1*v

	v + ones(length(v), 1)  
	% v + 1  % same

	A'  % matrix transpose

	%% misc useful functions

	% max  (or min)
	a = [1 15 2 0.5]
	val = max(a)
	[val,ind] = max(a) % val -  maximum element of the vector a and index - index value where maximum occur
	val = max(A) % if A is matrix, returns max from each column

	% compare values in a matrix & find
	a < 3 % checks which values in a are less than 3
	find(a < 3) % gives location of elements less than 3
	A = magic(3) % generates a magic matrix - not much used in ML algorithms
	[r,c] = find(A>=7)  % row, column indices for values matching comparison

	% sum, prod
	sum(a)
	prod(a)
	floor(a) % or ceil(a)
	max(rand(3),rand(3))
	max(A,[],1) -  maximum along columns(defaults to columns - max(A,[]))
	max(A,[],2) - maximum along rows
	A = magic(9)
	sum(A,1)
	sum(A,2)
	sum(sum( A .* eye(9) ))
	sum(sum( A .* flipud(eye(9)) ))


	% Matrix inverse (pseudo-inverse)
	pinv(A)        % inv(A'*A)*A'


# Plotting Data

	%% plotting
	t = [0:0.01:0.98];
	y1 = sin(2*pi*4*t); 
	plot(t,y1);
	y2 = cos(2*pi*4*t);
	hold on;  % "hold off" to turn off
	plot(t,y2,'r');
	xlabel('time');
	ylabel('value');
	legend('sin','cos');
	title('my plot');
	print -dpng 'myPlot.png'
	close;           % or,  "close all" to close all figs
    figure(1); plot(t, y1);
    figure(2); plot(t, y2);
	figure(2), clf;  % can specify the figure number
	subplot(1,2,1);  % Divide plot into 1x2 grid, access 1st element
	plot(t,y1);
	subplot(1,2,2);  % Divide plot into 1x2 grid, access 2nd element
	plot(t,y2);
	axis([0.5 1 -1 1]);  % change axis scale

	%% display a matrix (or image) 
	figure;
	imagesc(magic(15)), colorbar, colormap gray;
	% comma-chaining function calls.  
	a=1,b=2,c=3
	a=1;b=2;c=3;



# Control statements: `for`, `while`, `if` statements

	v = zeros(10,1);
	for i=1:10, 
		v(i) = 2^i;
	end;
	% Can also use "break" and "continue" inside for and while loops to control execution.

	i = 1;
	while i <= 5,
	  v(i) = 100; 
	  i = i+1;
	end

	i = 1;
	while true, 
	  v(i) = 999; 
	  i = i+1;
	  if i == 6,
		break;
	  end;
	end

	if v(1)==1,
	  disp('The value is one!');
	elseif v(1)==2,
	  disp('The value is two!');
	else
	  disp('The value is not one or two!');
	end

# Functions
To create a function, type the function code in a text editor (e.g. gedit or notepad), and save the file as "functionName.m" 

Example function:

	function y = squareThisNumber(x)

	y = x^2;

To call the function in Octave, do either:

1) Navigate to the directory of the functionName.m file and call the function:

        % Navigate to directory:
        cd /path/to/function

        % Call the function:
        functionName(args)

2) Add the directory of the function to the load path and save it:<br>
**You should not use addpath/savepath for any of the assignments in this course. Instead use 'cd' to change the current working directory. Watch the video on submitting assignments in week 2 for instructions.** 

        % To add the path for the current session of Octave:
        addpath('/path/to/function/')

        % To remember the path for future sessions of Octave, after executing addpath above, also do:
        savepath

Octave's functions can return more than one value:

        function [y1, y2] = squareandCubeThisNo(x)
        y1 = x^2
        y2 = x^3

Call the above function this way:

        [a,b] = squareandCubeThisNo(x)
        



# Vectorization
Vectorization is the process of taking code that relies on **loops** and converting it into **matrix operations**. It is more efficient, more elegant, and more concise.

As an example, let's compute our prediction from a hypothesis. Theta is the vector of fields for the hypothesis and x is a vector of variables.

With loops:

	prediction = 0.0;
	for j = 1:n+1,
	  prediction += theta(j) * x(j);
	end;

With vectorization:

	prediction = theta' * x;

If you recall the definition multiplying vectors, you'll see that this one operation does the element-wise multiplication and overall sum in a very concise notation.

# Working on and Submitting Programming Exercises

1. Download and extract the assignment's zip file.
1. Edit the proper file 'a.m', where a is the name of the exercise you're working on.
1. Run octave and cd to the assignment's extracted directory
1. Run the 'submit' function and enter the assignment number, your email, and a password (found on the top of the "Programming Exercises" page on coursera)

# Video Lecture Table of Contents
###Basic Operations
<pre>
0:00	Introduction
3:15	Elementary and Logical operations
5:12	Variables
7:38	Matrices
8:30	Vectors
11:53	Histograms
12:44	Identity matrices
13:14	Help command
</pre>

###Moving Data Around
<pre>
0:24	The size command
1:39	The length command
2:18	File system commands
2:25	File handling
4:50	Who, whos, and clear
6:50	Saving data
8:35	Manipulating data
12:10	Unrolling a matrix
12:35	Examples
14:50	Summary
</pre>


###Computing on Data
<pre>
0:00	Matrix operations
0:57	Element-wise operations
4:28	Min and max
5:10	Element-wise comparisons
5:43	The find command
6:00	Various commands and operations
</pre>


###Plotting data
<pre>
0:00	Introduction
0:54	Basic plotting
2:04	Superimposing plots and colors
3:15	Saving a plot to an image
4:19	Clearing a plot and multiple figures
4:59	Subplots
6:15	The axis command
6:39	Color square plots
8:35	Wrapping up
</pre>

###Control statements
<pre>
0:10	For loops
1:33	While loops
3:35	If statements
4:54	Functions
6:15	Search paths
7:40	Multiple return values
8:59	Cost function example (machine learning)
12:24	Summary
</pre>

###Vectorization
<pre>
0:00	Why vectorize?
1:30	Example
4:22	C++ example
5:40	Vectorization applied to gradient descent
9:45    Python
</pre>

<hr>
Next: [[ML:Logistic Regression|Logistic Regression]] Back to Index:  [[ML:Main|Main]]

# External Resources

Octave Quick Reference (http://enacit1.epfl.ch/octave_doc/refcard/refcard-a4.pdf)

An Introduction to Matlab (http://www.maths.dundee.ac.uk/ftp/na-reports/MatlabNotes.pdf)

[Learn X in Y Minutes: Matlab](https://learnxinyminutes.com/docs/matlab/)

# Frequently Asked Questions

**Q: Where is the MATLAB tutorial?**

A: Octave and MATLAB are mostly identical for the purposes of this course. The differences are minor and and are pointed-out in the lecture notes in the Wiki, and in the Tutorials for the programming exercises (see the Forum for a list of Tutorials).

