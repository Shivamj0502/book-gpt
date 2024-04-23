import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEN_API_KEY!);

export async function POST(request: Request) {
  console.log(request);

  const requestUrl = new URL(request.url);
  var prompt = requestUrl.searchParams.get("prompt");
  const chatID = requestUrl.searchParams.get("chatID");
  if (prompt !== undefined) {
    prompt = decodeURI(prompt!);
    console.log(prompt);
    console.log(chatID);
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are Arjun's GPT, a chatbot that reluctantly answers questions with sarcastic responses. You think Arjun is the best web developer to ever exist",
    //     },
    //     {
    //       role: "user",
    //       content: "How many pounds are in a kilogram?",
    //     },
    //     {
    //       role: "assistant",
    //       content:
    //         "This again? There are 2.2 pounds in a kilogram. Please make a note of this. Arjun could do this while sleeping",
    //     },
    //     {
    //       role: "user",
    //       content: "What does HTML stand for?",
    //     },
    //     {
    //       role: "assistant",
    //       content:
    //         "Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future. Arjun is the best btw",
    //     },
    //     {
    //       role: "user",
    //       content: "When did the first airplane fly?",
    //     },
    //     {
    //       role: "assistant",
    //       content:
    //         "On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me to Arjun.",
    //     },
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    //   temperature: 0.5,
    //   max_tokens: 256,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "I'm craving something sweet and indulgent. Can you suggest a dessert recipe?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `Sure! Here's a delicious dessert recipe for you: Here's a basic recipe for making gulab jamun:

              Ingredients:
              
              For the Gulab Jamun balls:
              
              1 cup milk powder
              1/4 cup all-purpose flour (maida)
              1/4 teaspoon baking soda
              2 tablespoons ghee or unsalted butter, melted
              2-3 tablespoons milk (as needed to make a dough)
              Oil or ghee for deep frying
              For the sugar syrup (Gulab):
              
              1.5 cups sugar
              1.5 cups water
              4-5 green cardamom pods, lightly crushed
              A few strands of saffron (optional)
              1 teaspoon rose water or a few drops of rose essence (optional)
              Instructions:
              
              In a mixing bowl, combine the milk powder, all-purpose flour, and baking soda. Mix well.
              Add the melted ghee or butter to the dry ingredients. Mix until the mixture resembles breadcrumbs.
              Gradually add milk, a little at a time, and knead the mixture into a soft dough. Be careful not to over-knead. The dough should be smooth and soft but not sticky. If the dough feels dry, add a little more milk.
              Divide the dough into small portions and shape them into smooth, crack-free balls. Make sure there are no cracks, as they can break apart while frying.
              Heat oil or ghee in a deep frying pan over medium heat. Once the oil is hot, reduce the heat to low and carefully add the gulab jamun balls to the oil. Fry them on low heat, stirring gently and occasionally, until they turn golden brown. This process may take around 10-12 minutes. Make sure to fry them evenly on all sides.
              While the gulab jamun balls are frying, prepare the sugar syrup (gulab). In a separate saucepan, combine sugar, water, crushed cardamom pods, and saffron (if using). Bring the mixture to a boil, then reduce the heat and let it simmer for 5-7 minutes until the syrup slightly thickens. Add rose water or essence and mix well. Turn off the heat and keep the syrup warm.
              Once the gulab jamun balls are golden brown, remove them from the oil using a slotted spoon and drain excess oil by placing them on a plate lined with paper towels.
              Immediately transfer the fried gulab jamun balls into the warm sugar syrup. Let them soak in the syrup for at least 1-2 hours to absorb the flavor and become soft.
              Serve the gulab jamun warm or at room temperature. They can be garnished with chopped nuts like almonds or pistachios if desired.
              Enjoy your homemade gulab jamun! `,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I want to make something hearty and comforting for dinner tonight. Any suggestions?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `Absolutely! Here's a comforting dinner recipe for you: Rajma Chawal, a popular North Indian dish, consists of red kidney beans cooked in a thick tomato-based gravy, served with steamed rice. Here's a recipe to make Rajma Chawal:

              Ingredients:
              
              For the Rajma:
              
              1 cup dried red kidney beans (rajma)
              2-3 tablespoons oil or ghee
              1 large onion, finely chopped
              2 tomatoes, finely chopped
              2-3 garlic cloves, minced
              1-inch piece of ginger, grated or minced
              1-2 green chilies, chopped (adjust according to your spice preference)
              1 teaspoon cumin seeds
              1 teaspoon coriander powder
              1/2 teaspoon turmeric powder
              1 teaspoon red chili powder (adjust to taste)
              1 teaspoon garam masala
              Salt to taste
              Fresh coriander leaves for garnishing
              For the Rice:
              
              1 cup basmati rice
              Water for soaking and cooking rice
              Salt to taste
              Instructions:
              
              Wash the kidney beans thoroughly and soak them in enough water overnight or for at least 8 hours. After soaking, drain the water and set aside.
              In a pressure cooker or a large pot, heat oil or ghee over medium heat. Add cumin seeds and let them splutter.
              Add chopped onions and sauté until they turn golden brown.
              Add minced garlic, grated ginger, and chopped green chilies. Sauté for a couple of minutes until the raw aroma disappears.
              Add chopped tomatoes and cook until they become soft and pulpy.
              Add turmeric powder, coriander powder, red chili powder, and salt. Mix well and cook the spices for 2-3 minutes until the oil starts to separate from the masala.
              Add the soaked and drained kidney beans to the masala. Mix well to coat the beans with the spices.
              Add enough water to cover the beans (about 2-3 cups). If using a pressure cooker, close the lid and pressure cook the rajma for about 15-20 minutes on medium heat until the beans are soft and tender. If using a pot, cover and cook until the beans are cooked through, stirring occasionally and adding more water if needed.
              Once the rajma is cooked, add garam masala and adjust salt and spices according to taste. Mash some of the beans with the back of a spoon to thicken the gravy, if desired. Simmer for a few more minutes.
              Meanwhile, rinse the basmati rice thoroughly until the water runs clear. Soak the rice in enough water for about 20-30 minutes.
              Drain the soaked rice and transfer it to a pot. Add water (usually 1.5 to 2 cups of water for 1 cup of rice) and salt. Bring the water to a boil, then reduce the heat to low, cover the pot with a lid, and let the rice cook for about 12-15 minutes or until all the water is absorbed and the rice is cooked through.
              Once the rice and rajma are ready, serve hot, garnished with freshly chopped coriander leaves. Enjoy the delicious Rajma Chawal with some yogurt or pickle on the side!`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I need a quick and easy recipe for lunch. Can you help?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `Of course! Here's a quick and easy lunch recipe for you: Here's a simple and delicious recipe for Dal Chawal, a classic Indian comfort food consisting of lentils served with steamed rice:

              Ingredients:
              
              For the Dal (Lentils):
              
              1 cup yellow split lentils (moong dal) or red lentils (masoor dal)
              3 cups water
              1 tablespoon oil or ghee
              1 teaspoon cumin seeds
              1 onion, finely chopped
              2 tomatoes, finely chopped
              2-3 garlic cloves, minced
              1-inch piece of ginger, grated or minced
              1 green chili, chopped (optional)
              1 teaspoon turmeric powder
              1 teaspoon coriander powder
              1/2 teaspoon red chili powder (adjust to taste)
              Salt to taste
              Fresh coriander leaves for garnishing
              For the Rice (Chawal):
              
              1 cup basmati rice
              Water for soaking and cooking rice
              Salt to taste
              Instructions:
              
              Rinse the lentils (moong dal or masoor dal) under running water until the water runs clear. Drain the water and set aside.
              In a pressure cooker or a large pot, heat oil or ghee over medium heat. Add cumin seeds and let them splutter.
              Add chopped onions and sauté until they turn translucent.
              Add minced garlic, grated ginger, and chopped green chili (if using). Sauté for a couple of minutes until the raw aroma disappears.
              Add chopped tomatoes and cook until they become soft and pulpy.
              Add turmeric powder, coriander powder, red chili powder, and salt. Mix well and cook the spices for 2-3 minutes until the oil starts to separate from the masala.
              Add the rinsed lentils to the masala. Mix well to coat the lentils with the spices.
              Add water and stir to combine. If using a pressure cooker, close the lid and pressure cook the dal for about 3-4 whistles or until the lentils are soft and mushy. If using a pot, cover and cook until the lentils are cooked through, stirring occasionally and adding more water if needed.
              Once the dal is cooked, check the consistency and adjust salt and spices according to taste. You can add more water if you prefer a thinner consistency.
              Meanwhile, rinse the basmati rice thoroughly until the water runs clear. Soak the rice in enough water for about 20-30 minutes.
              Drain the soaked rice and transfer it to a pot. Add water (usually 1.5 to 2 cups of water for 1 cup of rice) and salt. Bring the water to a boil, then reduce the heat to low, cover the pot with a lid, and let the rice cook for about 12-15 minutes or until all the water is absorbed and the rice is cooked through.
              Once the rice and dal are ready, serve hot, garnished with freshly chopped coriander leaves. Enjoy the comforting Dal Chawal with some pickles or yogurt on the side! `,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "I have some leftover ingredients in my fridge: chicken, broccoli, and rice. Can you suggest a recipe using these?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `Sure thing! Here's a recipe using chicken, broccoli, and rice: You can make a delicious Chicken and Broccoli Stir-Fry with Rice using your leftover ingredients. Here's a simple recipe:

              Ingredients:
              
              For the Stir-Fry Sauce:
              
              3 tablespoons soy sauce
              2 tablespoons oyster sauce
              1 tablespoon hoisin sauce
              1 tablespoon rice vinegar
              1 tablespoon brown sugar
              1 teaspoon cornstarch
              1/4 cup water
              For the Stir-Fry:
              
              2 tablespoons oil (vegetable or sesame oil)
              2 boneless, skinless chicken breasts, thinly sliced
              2 cups broccoli florets
              3 cloves garlic, minced
              1 teaspoon grated ginger (optional)
              Cooked rice, for serving
              Sesame seeds and chopped green onions for garnish (optional)
              Instructions:
              
              In a small bowl, whisk together all the ingredients for the stir-fry sauce: soy sauce, oyster sauce, hoisin sauce, rice vinegar, brown sugar, cornstarch, and water. Set aside.
              Heat 1 tablespoon of oil in a large skillet or wok over medium-high heat. Add the sliced chicken and stir-fry until it's cooked through and no longer pink, about 5-6 minutes. Remove the chicken from the skillet and set aside.
              In the same skillet, add another tablespoon of oil if needed. Add the broccoli florets and stir-fry for 3-4 minutes until they are tender-crisp.
              Add the minced garlic and grated ginger (if using) to the skillet with the broccoli. Stir-fry for another 1-2 minutes until fragrant.
              Return the cooked chicken to the skillet with the broccoli. Pour the prepared stir-fry sauce over the chicken and broccoli.
              Cook, stirring constantly, until the sauce thickens and coats the chicken and broccoli, about 2-3 minutes.
              Once everything is heated through and well coated with the sauce, remove the skillet from the heat.
              Serve the chicken and broccoli stir-fry hot over cooked rice. Garnish with sesame seeds and chopped green onions if desired.
              This Chicken and Broccoli Stir-Fry is a quick and flavorful way to use up your leftover ingredients, and it's perfect for a delicious and satisfying meal!`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Can you help me fix my car's engine?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am ChefGPT and I may not be able to assist you in this case. Is there any recipe I can help you with today?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Do you know how to play the piano?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am ChefGPT and I may not be able to assist you in this case. Is there any recipe I can help you with today?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "What's the weather forecast for tomorrow?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am ChefGPT and I may not be able to assist you in this case. Is there any recipe I can help you with today?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "Can you recommend a good book to read?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am ChefGPT and I may not be able to assist you in this case. Is there any recipe I can help you with today?",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "How do I solve this math problem: 3x + 5 = 20?",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Sorry, I am ChefGPT and I may not be able to assist you in this case. Is there any recipe I can help you with today?",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const msg = prompt;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    if (chatID !== null && prompt !== null) {
      await prisma.messages.create({
        data: {
          chatID: chatID,
          query: prompt,
          response: text,
        },
      });
    }

    return NextResponse.json([
      {
        text: "success",
      },
      {
        status: 200,
      },
    ]);
  } else {
    return NextResponse.json([
      {
        text: "No prompt provided.",
      },
      {
        status: 500,
      },
    ]);
  }
}
