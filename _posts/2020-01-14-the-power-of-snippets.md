---
layout: post
title: 'The power of code snippets'
tags: [Swift, Xcode, iOS dev]
featured_image_thumbnail: 
featured_image: 
---

I recently discovered the utility of the snippet feature in Xcode. Currently I’m mainly developing my apps with Swift and doing the UI programatically. That’s a lot of boilerplate code and I am bored to always type the same short bit of code for each of my views.

## What’s a snippet

For a detailed description of a snippet you can check [NSHipster post](https://nshipster.com/xcode-snippets/) that explain well and is still relevant.

**TL;DR:** A snippet is a small bit of re-usable code or text.

Xcode already provide some snippets for common patterns in swift and objective-c. You can find them by clicking on the <mark>+</mark> button located on the Xcode top bar. 

![snippets-1](assets/images/posts/2020/snippets-1.png)


## Why do I need snippets

As explained at the beginning of this article, I does all my UI related stuff programmatically and UI is composed of a lot of boilerplate code, especially for the view declaration.

This is how I initialize a label : 

{% highlight swift %}
    var nameLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "John Appleseed"
        label.textColor = UIColor.label
        label.font = UIFont.preferredFont(forTextStyle: .body)
        return label
    }()
{% endhighlight %}

The goal is to strip the initialisation code of all our app specific values, then you will have the perfect candidate for a snippet. Now that we know the idea, we can create our first snippet by simply selecting a part of your code, right click and select <mark>create code snippet</mark>.

![snippets-2](assets/images/posts/2020/snippets-2.png)

The snippets is now created and contains the code you selected.

![snippets-3](assets/images/posts/2020/snippets-3.png)

A this point the snippet is ok but we can improve it. We will add some placeholders for the values that can change between each label you will setup. adding a placeholder is easy, they are delimited by <mark><#</mark> and <mark>#></mark> tokens.

Update the code in the snippet with the declaration below.

{% highlight swift %}
    var <#varName#>Label: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = <#text#>
        label.textColor = <#color#>
        label.font = UIFont.preferredFont(forTextStyle: .<#textStyle#>)
        return label
    }()
{% endhighlight %}

We also want to add a completion shortcut, we will go with “customLabel”.

Now if you type <mark>customLabel</mark> in a swift file, the autocompletion will suggest your snippet, tap enter and voila all your label UI code is added, you just have to replace the placeholders with the desired values.

You can find below some of my UI snippets that I use often.

Thanks for reading ! 😊

## Some UI snippets I use often

### UILabel

{% highlight swift %}
    var <#varName#>Label: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = <#text#>
        label.textColor = <#color#>
        label.font = UIFont.preferredFont(forTextStyle: .<#textStyle#>)
        return label
    }()
{% endhighlight %}

### UIButton

{% highlight swift %}
    var <#buttonName#>Button: UIButton = {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
{% endhighlight %}

### UIImageView

{% highlight swift %}
    var <#name#>ImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
{% endhighlight %}

### UIStackView

{% highlight swift %}
    var stackView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis = .<#axis#>
        stackView.alignment = .<#alignment#>
        stackView.spacing = <#spacing#>
        stackView.translatesAutoresizingMaskIntoConstraints = false
        return stackView
    }()
{% endhighlight %}

### Custom UIView

{% highlight swift %}
class <#viewName#>View: UIView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    func setupView() {
        // Put your view setup here
    }
    
}
{% endhighlight %}
