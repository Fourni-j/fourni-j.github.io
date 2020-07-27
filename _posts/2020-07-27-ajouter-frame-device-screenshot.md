---
layout: post
title: Comment ajouter la frame d'un device sur vos screenshots
tags: [tips]
image: '/assets/images/posts/2020/framed-screenshots-thumbnail.jpg'
featured_image_thumbnail: '/assets/images/posts/2020/framed-screenshots-thumbnail.jpg'
featured_image: '/assets/images/posts/2020/framed-screenshots-cover.jpg'
---

Comment ajouter la frame d’un device (iPhone / iPad / Android) pour améliorer ses screenshots.

### Pré-requis

Nous allons utiliser [Fastlane](https://fastlane.tools) pour simplifier et automatiser l'ajout des devices sur nos screenshots. Fastlane est un outil qui permet d'automatiser le processus de mise en production d'une application mobile. Parmi toutes ses fonctionnalités, nous allons nous attarder sur *[frameit](https://docs.fastlane.tools/actions/frameit/)*.

Je vous laisse lire [la documentation](https://docs.fastlane.tools/getting-started/ios/setup/) de fastlane pour l'installation de celui-ci. Je vous conseille tout de même de faire une instalation globale afin de pouvoir l'utiliser depuis n'importe quel dossier.

### Comment utiliser Frameit

##### Screenshot d'iPhone / iPad

Une seule commande à retenir.

{% highlight shell %}
> fastlane frameit
{% endhighlight %}

Il vous suffit d'avoir vos différents screenshots dans un dossier, vous allez dans le dossier et vous lancez la commande ci-dessus. 

Fastlane va passer chacun des screenshots en revu, en fonction de la taille il va ajouter la frame du device associé. Vos screenshots peuvent être pris avec le simulateur ou avec votre device physique cela ne change rien, il faut juste qu'ils aient la taille par défaut. 

Vous pouvez trouver la liste des tailles de screenshot par type de device dans [la documentation](https://help.apple.com/app-store-connect/#/devd274dd925) d'Apple


Il y a une petite subtilité pour les screenshots d'iPad Pro, en fonction de la génération de celui-ci vous aurez la version avec TouchID ou FaceID. Etant donné que la taille des screenshots est la même pour les deux devices, il vous suffit d'ajouter le type de device que vous souhaitez dans le nom du fichier pour que fastlane puisse ajouter la bonne frame. 

{% highlight shell %}
iPad Pro avec TouchID   -> 'iPad Pro (12.9-inch) (2nd generation)'

iPad Pro avec FaceID    -> 'iPad Pro (12.9-inch) (3rd generation)'
{% endhighlight %}

##### Screenshot d'un Android

Il suffit de dire explicitement à fastlane que l'on veut une frame d'android. La logique est la même en fonction de la taille, le device sera différent. 

{% highlight shell %}
> fastlane frameit android
{% endhighlight %}

Dans mon cas, j'ai eu quelques soucis avec des screenshots en <mark>1080x1920</mark>. Après quelques recherches, il s'agit d'un bug. Pour le corriger, il faut modifier le fichier de configuration de fastlane. 

Dans le dossier où est installé Fastlane, vous allez devoir modifier le fichier suivant.

{% highlight shell %}
fastlane/frameit/latest/offsets.json
{% endhighlight %}

Il faut maintenant modifier la ligne <mark>Nexus 5x</mark> en <mark>Nexus 5X</mark>. L'objet final ressemble à cela. 

{% highlight json %}
"Nexus 5X": {
    "offset": "+53+231",
    "width": 1080
},
{% endhighlight %}

Une fois que la modification est faite, vous pouvez relancer fastlane et ça devrait fonctionner. 

### Conclusion

Vous pouvez maintenant facilement ajouter la frame d'un device autour de vos screenshots. Cela permet de mettre en valeur vos screenshots rapidement.


